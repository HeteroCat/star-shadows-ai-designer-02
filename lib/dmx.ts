const BASE_URL = process.env.DMX_BASE_URL || 'https://www.dmxapi.cn/v1'
const API_KEY = process.env.DMX_API_KEY

type SeedreamPayload = {
  model?: string
  prompt: string
}

type MaxImagesPayload = {
  model?: string
  prompt: string
  image: string[]
}

type EditBase64Payload = {
  model?: string
  prompt: string
  image_base64: string
}

async function postJson(path: string, body: any) {
  if (!API_KEY) {
    console.error('DMX_API_KEY 环境变量未配置')
    return null
  }

  try {
    console.log(`调用 DMX API: ${BASE_URL}${path}`, { body: { ...body, apiKey: API_KEY ? '已配置' : '未配置' } })

    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(body)
    })

    console.log(`DMX API 响应状态: ${res.status} ${res.statusText}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`DMX API 调用失败: ${res.status} ${res.statusText}`, errorText)
      return null
    }

    const data = await res.json()
    console.log('DMX API 响应数据:', JSON.stringify(data, null, 2))
    return data
  } catch (error) {
    console.error('DMX API 调用异常:', error)
    return null
  }
}

export async function generateSeedream(payload: SeedreamPayload) {
  const data = await postJson('/images/generations', {
    model: payload.model || 'doubao-seedream-4-0-250828',
    prompt: payload.prompt,
    size: "2K",
    stream: false,
    response_format: "url",
    watermark: false,
    sequential_image_generation: "disabled"
  })
  const url = data?.data?.[0]?.url || data?.url
  return url ? { imageUrl: url } : null
}

export async function generateSeedreamMaxImages(payload: MaxImagesPayload) {
  const data = await postJson('/images/generations', {
    model: payload.model || 'doubao-seedream-4-0-250828',
    prompt: payload.prompt,
    image: payload.image,
    size: "2K",
    stream: false,
    response_format: "url",
    watermark: false,
    sequential_image_generation: "disabled"
  })

  console.log('豆包多图参考响应:', JSON.stringify(data, null, 2))

  // 豆包 Seedream 返回的是单个URL，不是数组
  const url = data?.data?.[0]?.url || data?.url
  return url ? { imageUrl: url } : null
}

// Nano Banana 多图参考功能（使用图片URL，不是Base64）
export async function generateNanoBananaImages(prompt: string, imageUrls: string[], model = 'nano-banana') {
  const data = await postJson('/images/generations', {
    model,
    prompt,
    image: imageUrls, // 使用图片URL数组
    size: "2K"
  })

  console.log('Nano Banana多图参考响应:', JSON.stringify(data, null, 2))

  const url = data?.data?.[0]?.url || data?.url
  return url ? { imageUrl: url } : null
}

// Nano Banana 图片编辑功能
export async function editNanoBanana(prompt: string, imageBase64: string, model = 'nano-banana') {
  // 图片编辑使用 FormData，需要特殊处理
  if (!API_KEY) {
    console.error('DMX_API_KEY 环境变量未配置')
    return null
  }

  try {
    console.log(`调用 Nano Banana 编辑API: ${BASE_URL}/images/edits`, { model, prompt: prompt.substring(0, 50) + '...' })

    // 创建 FormData
    const formData = new FormData()
    formData.append('model', model)
    formData.append('prompt', prompt)
    formData.append('size', '2K')
    formData.append('image', base64ToFile(imageBase64, 'edit.jpg'))

    const res = await fetch(`${BASE_URL}/images/edits`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      body: formData
    })

    console.log(`Nano Banana 编辑 API 响应状态: ${res.status} ${res.statusText}`)

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Nano Banana 编辑 API 调用失败: ${res.status} ${res.statusText}`, errorText)
      return null
    }

    const data = await res.json()
    console.log('Nano Banana 编辑 API 响应数据:', JSON.stringify(data, null, 2))

    const url = data?.data?.[0]?.url
    return url ? { imageUrl: url } : null
  } catch (error) {
    console.error('Nano Banana 编辑 API 调用异常:', error)
    return null
  }
}

// 辅助函数：将 Base64 转换为 File 对象
function base64ToFile(base64Data: string, fileName: string): File {
  // 添加缺失的 Base64 前缀
  const base64String = base64Data.startsWith('data:image') ? base64Data : `data:image/jpeg;base64,${base64Data}`

  // 分离前缀和数据
  const [prefix, base64] = base64String.split(',')
  const mimeType = prefix.match(/:(.*?);/)?.[1] || 'image/jpeg'

  // 将 Base64 转换为 Blob
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })

  // 创建 File 对象
  return new File([blob], fileName, { type: mimeType })
}

export async function editSeedreamBase64(payload: EditBase64Payload) {
  const data = await postJson('/images/generations', {
    model: payload.model || 'doubao-seedream-4-0-250828',
    prompt: payload.prompt,
    image_base64: payload.image_base64,
    size: "2K",
    stream: false,
    response_format: "url",
    watermark: false,
    sequential_image_generation: "disabled"
  })
  const url = data?.data?.[0]?.url || data?.url
  return url ? { imageUrl: url } : null
}

export async function generateNanoBanana(prompt: string, model = 'nano-banana') {
  const data = await postJson('/images/generations', {
    model,
    prompt,
    size: "2K",
    stream: false,
    response_format: "url",
    watermark: false
  })
  const url = data?.data?.[0]?.url || data?.url
  return url ? { imageUrl: url } : null
}