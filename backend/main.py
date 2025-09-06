from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import httpx
import asyncio
import base64
import os
from datetime import datetime
import uuid
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from dotenv import load_dotenv

# 加载环境变量
# 指定backend目录下的.env文件路径
backend_dir = Path(__file__).parent
load_dotenv(backend_dir / '.env')

app = FastAPI(title="AI设计师后端API", version="1.0.0")

# 静态文件服务
static_path = Path(__file__).parent.parent if Path(__file__).parent.parent.exists() else Path.cwd().parent
if static_path.exists():
    app.mount("/static", StaticFiles(directory=static_path), name="static")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React开发服务器
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据模型
class DesignRequest(BaseModel):
    type: str  # "clothing", "jewelry", "makeup"
    description: str
    style: Optional[str] = None
    color: Optional[str] = None
    model: Optional[str] = "doubao"  # 支持"doubao"和"google"

class ImageGenerationRequest(BaseModel):
    prompt: str
    model: str = "doubao"
    width: Optional[int] = 512
    height: Optional[int] = 512

class DownloadRequest(BaseModel):
    url: str

class DesignResponse(BaseModel):
    id: str
    type: str
    description: str
    image_url: str
    created_at: str

# 模拟数据存储
designs_db = []

def create_placeholder_image(text: str, width: int = 400, height: int = 400):
    """创建本地占位符图片并返回base64编码"""
    try:
        # 创建图片
        img = Image.new('RGB', (width, height), color='#f0f0f0')
        draw = ImageDraw.Draw(img)
        
        # 尝试使用默认字体
        try:
            font = ImageFont.truetype("arial.ttf", 20)
        except:
            font = ImageFont.load_default()
        
        # 计算文本位置
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # 绘制文本
        draw.text((x, y), text, fill='#666666', font=font)
        
        # 转换为base64
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        return f"data:image/png;base64,{img_str}"
    except Exception as e:
        print(f"创建占位符图片错误: {e}")
        # 返回一个简单的base64编码的1x1像素图片
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="

# AI模型配置 - 从环境变量加载
AI_MODELS_CONFIG = {
    "doubao": {
        "api_url": os.getenv("DOUBAO_API_URL", "https://ark.cn-beijing.volces.com/api/v3/images/generations"),
        "api_key": os.getenv("DOUBAO_API_KEY")
    },
    "google": {
        "api_url": "https://openrouter.ai/api/v1/chat/completions",
        "api_key": os.getenv("GOOGLE_API_KEY"),
        "model": "google/gemini-2.5-flash-image-preview"
    }
}

# 服务器配置
SERVER_HOST = os.getenv("HOST", "0.0.0.0")
SERVER_PORT = int(os.getenv("PORT", "8000"))
DEBUG_MODE = os.getenv("DEBUG", "True").lower() == "true"

# AI画图函数
async def generate_image_with_doubao(prompt: str, width: int = 512, height: int = 512):
    """使用豆包生成图片"""
    try:
        config = AI_MODELS_CONFIG["doubao"]
        if not config["api_key"]:
            print("豆包API密钥未配置")
            return create_placeholder_image(f"豆包图片生成\n需要API密钥\n{prompt[:20]}")
        
        print(f"豆包图片生成请求: {prompt}")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_url"],
                headers={
                    "Authorization": f"Bearer {config['api_key']}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "doubao-seedream-3-0-t2i-250415",
                    "prompt": prompt,
                    "response_format": "url",
                    "size": "1024x1024",
                    "guidance_scale": 2.5,
                    "watermark": False
                },
                timeout=60.0
            )
            
            print(f"豆包AI响应状态: {response.status_code}")
            data = response.json()
            print(f"豆包AI响应数据: {data}")
            
            if response.status_code == 200 and data.get("data") and len(data["data"]) > 0:
                return data["data"][0]["url"]
            else:
                error_msg = data.get("error", {}).get("message", f"API调用失败: {response.status_code}")
                print(f"豆包AI API错误: {error_msg}")
                return create_placeholder_image(f"豆包API错误\n{error_msg[:30]}")
                
    except Exception as e:
        print(f"豆包生成图片错误: {e}")
        return create_placeholder_image(f"豆包API错误\n{str(e)[:30]}")

async def generate_image_with_google(prompt: str, width: int = 512, height: int = 512):
    """使用谷歌AI生成图片"""
    try:
        config = AI_MODELS_CONFIG["google"]
        if not config["api_key"]:
            print("谷歌AI API密钥未配置")
            return create_placeholder_image(f"谷歌AI图片生成\n需要API密钥\n{prompt[:20]}")
        
        print(f"谷歌AI图片生成请求: {prompt}")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                config["api_url"],
                headers={
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Authorization": f"Bearer {config['api_key']}",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json",
                    "User-Agent": "PostmanRuntime-ApipostRuntime/1.1.0"
                },
                json={
                    "model": config["model"],
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                }
                            ]
                        }
                    ]
                },
                timeout=60.0
            )
            
            print(f"谷歌AI响应状态: {response.status_code}")
            data = response.json()
           
            
            if response.status_code == 200 and data.get("choices") and len(data["choices"]) > 0:
                message = data["choices"][0].get("message", {})
                images = message.get("images", [])
                if images and len(images) > 0:
                    image_url = images[0].get("image_url", {}).get("url")
                    if image_url:
                        return image_url
                    else:
                        print("谷歌AI响应中未找到图片URL")
                        return create_placeholder_image(f"谷歌AI响应错误\n未找到图片URL")
                else:
                    print("谷歌AI响应中未找到图片数据")
                    return create_placeholder_image(f"谷歌AI响应错误\n未找到图片数据")
            else:
                error_msg = data.get("error", {}).get("message", f"API调用失败: {response.status_code}")
                print(f"谷歌AI API错误: {error_msg}")
                return create_placeholder_image(f"谷歌AI API错误\n{error_msg[:30]}")
                
    except Exception as e:
        print(f"谷歌AI生成图片错误: {e}")
        return create_placeholder_image(f"谷歌AI API错误\n{str(e)[:30]}")

async def generate_image(prompt: str, model: str = "doubao", width: int = 512, height: int = 512):
    """生成图片 - 支持豆包和谷歌AI模型"""
    if model == "doubao":
        return await generate_image_with_doubao(prompt, width, height)
    elif model == "google":
        return await generate_image_with_google(prompt, width, height)
    else:
        return create_placeholder_image(f"不支持的模型: {model}\n支持的模型: doubao, google")

@app.get("/")
async def root():
    return {"message": "AI设计师后端API"}

@app.get("/api/designs")
async def get_designs():
    """获取所有设计作品"""
    return {"designs": designs_db}

@app.post("/api/designs", response_model=DesignResponse)
async def create_design(request: DesignRequest):
    """创建新的设计作品"""
    print(f"收到设计请求: {request}")
    design_id = str(uuid.uuid4())
    
    # 构建详细的提示词
    prompt_parts = [request.description]
    if request.style:
        prompt_parts.append(f"风格：{request.style}")
    if request.color:
        prompt_parts.append(f"颜色：{request.color}")
    
    # 根据类型添加特定描述
    type_descriptions = {
        "clothing": "时尚服装设计，高质量，专业摄影",
        "jewelry": "精美珠宝设计，闪亮光泽，奢华质感",
        "makeup": "美妆造型设计，精致妆容，时尚美丽"
    }
    
    if request.type in type_descriptions:
        prompt_parts.append(type_descriptions[request.type])
    
    full_prompt = ", ".join(prompt_parts)
    
    # 生成图片
    image_url = await generate_image(full_prompt, request.model or "doubao")
    
    design = {
        "id": design_id,
        "type": request.type,
        "description": request.description,
        "style": request.style,
        "color": request.color,
        "model": request.model or "doubao",
        "image_url": image_url,
        "created_at": datetime.now().isoformat()
    }
    
    designs_db.append(design)
    return design

@app.post("/api/generate-image")
async def generate_image_endpoint(request: ImageGenerationRequest):
    """直接生成图片接口"""
    image_url = await generate_image(request.prompt, request.model, request.width, request.height)
    return {
        "image_url": image_url,
        "prompt": request.prompt,
        "model": request.model,
        "created_at": datetime.now().isoformat()
    }

@app.get("/api/designs/{design_id}")
async def get_design(design_id: str):
    """获取特定设计作品"""
    for design in designs_db:
        if design["id"] == design_id:
            return design
    raise HTTPException(status_code=404, detail="设计作品未找到")

@app.delete("/api/designs/{design_id}")
async def delete_design(design_id: str):
    """删除设计作品"""
    global designs_db
    designs_db = [d for d in designs_db if d["id"] != design_id]
    return {"message": "设计作品已删除"}

# 路由处理
@app.get("/", response_class=HTMLResponse)
async def read_root():
    """主页路由"""
    html_path = Path.cwd().parent / "index.html"
    if html_path.exists():
        return HTMLResponse(content=html_path.read_text(encoding='utf-8'))
    return HTMLResponse(content="<h1>AI Designer Home</h1>")

@app.get("/clothes", response_class=HTMLResponse)
async def clothes_page():
    """AI服装设计页面"""
    html_path = Path.cwd().parent / "index.html"
    if html_path.exists():
        content = html_path.read_text(encoding='utf-8')
        # 注入路由信息到页面
        content = content.replace('<body>', '<body data-route="clothes">')
        return HTMLResponse(content=content)
    return HTMLResponse(content="<h1>AI Clothing Design</h1>")

@app.get("/jewelry", response_class=HTMLResponse)
async def jewelry_page():
    """AI珠宝设计页面"""
    html_path = Path.cwd().parent / "index.html"
    if html_path.exists():
        content = html_path.read_text(encoding='utf-8')
        content = content.replace('<body>', '<body data-route="jewelry">')
        return HTMLResponse(content=content)
    return HTMLResponse(content="<h1>AI Jewelry Design</h1>")

@app.get("/makeup", response_class=HTMLResponse)
async def makeup_page():
    """AI美妆设计页面"""
    html_path = Path.cwd().parent / "index.html"
    if html_path.exists():
        content = html_path.read_text(encoding='utf-8')
        content = content.replace('<body>', '<body data-route="makeup">')
        return HTMLResponse(content=content)
    return HTMLResponse(content="<h1>AI Makeup Design</h1>")

@app.post("/api/download-image")
async def download_image(request: DownloadRequest):
    """代理下载图片接口，解决CORS问题"""
    url = request.url
    try:
        print(f"尝试下载图片: {url[:100]}...")
        
        # 检查是否是Base64编码的图片数据
        if url.startswith("data:image/"):
            print("检测到Base64编码的图片数据")
            # 解析Base64数据
            try:
                # 提取MIME类型和Base64数据
                header, data = url.split(',', 1)
                mime_type = header.split(';')[0].split(':')[1]
                
                # 解码Base64数据
                image_data = base64.b64decode(data)
                
                from fastapi.responses import Response
                return Response(
                    content=image_data,
                    media_type=mime_type,
                    headers={
                        "Content-Disposition": f"attachment; filename=ai-design-{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
                    }
                )
            except Exception as e:
                print(f"解析Base64图片数据失败: {e}")
                raise HTTPException(status_code=400, detail="无效的Base64图片数据")
        
        # 处理普通URL
        else:
            # 为不同的图片源设置不同的请求头
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            
            # 如果是谷歌相关的URL，添加特殊处理
            if "googleusercontent.com" in url or "google.com" in url:
                headers.update({
                    "Referer": "https://google.com",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8"
                })
            
            async with httpx.AsyncClient(follow_redirects=True) as client:
                response = await client.get(url, headers=headers, timeout=30.0)
                print(f"下载响应状态: {response.status_code}")
                
                if response.status_code == 200:
                    from fastapi.responses import Response
                    content_type = response.headers.get('content-type', 'image/png')
                    print(f"图片内容类型: {content_type}")
                    return Response(
                        content=response.content,
                        media_type=content_type,
                        headers={
                            "Content-Disposition": f"attachment; filename=ai-design-{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
                        }
                    )
                else:
                    print(f"下载失败，状态码: {response.status_code}, 响应: {response.text[:200]}")
                    raise HTTPException(status_code=400, detail=f"无法下载图片，状态码: {response.status_code}")
                    
    except httpx.TimeoutException:
        print("下载图片超时")
        raise HTTPException(status_code=408, detail="下载超时")
    except Exception as e:
        print(f"下载图片错误: {e}")
        raise HTTPException(status_code=500, detail=f"下载失败: {str(e)}")

@app.get("/api/health")
async def health_check():
    """健康检查接口"""
    return {"status": "ok", "message": "FastAPI server is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host=SERVER_HOST, port=SERVER_PORT, reload=DEBUG_MODE)