from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="AI设计师后端API", version="1.0.0")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React开发服务器
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

class DesignResponse(BaseModel):
    id: str
    type: str
    description: str
    image_url: str
    created_at: str

# 模拟数据存储
designs_db = []

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
    import uuid
    from datetime import datetime
    
    design_id = str(uuid.uuid4())
    design = {
        "id": design_id,
        "type": request.type,
        "description": request.description,
        "style": request.style,
        "color": request.color,
        "image_url": f"https://via.placeholder.com/400x400?text={request.type}",
        "created_at": datetime.now().isoformat()
    }
    
    designs_db.append(design)
    return design

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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)