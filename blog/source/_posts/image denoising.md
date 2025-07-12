---
title: 图像去噪(生成噪声图片)
date: 2025-03-13 00:13:31
tags: 图像处理，实践，理论，python，滤波器
top_imag:
comment: true
categories:
	- 图像降噪
---
## 前言
最近学习计算机视觉时有接触到关于图像降噪的知识，接下来这个系列就主要用来介绍一下传统图像降噪的方式。在正式开始介绍降噪之前，我们先来介绍一下一些比较常见的加噪方式与指标。

## 常见噪声简介与示例代码
在介绍常见的噪声之前，我们先引入我们的原图，也是计算机视觉领域比较经典的一张图,
![lena.jpg](https://juste.com.cn/blog/Images/picture_denoising/lena.jpg)

### 高斯噪声
高斯噪声简单理解就是服从高斯分布的随机噪声，其概率密度函数是 $P(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x - \mu)^2}{2\sigma^2}} $
其中 $\mu$ 决定噪声的平均值， $\sigma^{2}$决定噪声强度，注意高斯噪声通常被认为是独立同分布的。
```python

def add_gaussian_noise(image, mean=0, std=25):
    row, col, ch = image.shape
    gauss = np.random.normal(mean, std, (row, col, ch))
    gauss = gauss.reshape(row, col, ch)
    noisy_image = image + gauss
    noisy_image = np.clip(noisy_image, 0, 255)  # 确保像素值在 0-255 范围内
    noisy_image = noisy_image.astype(np.uint8)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/gaussian_image_sigma_20.jpg)

### 椒盐噪声
椒盐噪声是指图像中部分像素随机地被设置为最大值（盐）或最小值（椒），常用于模拟传感器由于传输错误或脏污等原因产生的噪声。椒盐噪声不涉及明确的概率密度函数，而是通过概率 $p$ 来控制噪点出现的概率。
```python
def add_salt_pepper_noise(image, prob=0.05):
    noisy_image = np.copy(image)
    h, w, c = noisy_image.shape
    pepper = np.random.rand(h, w) < prob
    noisy_image[pepper] = 0
    salt = np.random.rand(h, w) < prob
    noisy_image[salt] = 255
    noisy_image = np.clip(noisy_image, 0, 255)  # 确保像素值在 0-255 范围内
    noisy_image = noisy_image.astype(np.uint8)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/salt_pepper_image.jpg)

### 泊松噪声
泊松噪声又称为“散粒噪声”或“Shot Noise”，由光电探测器中光子的随机到达产生，其特性与信号强度有关。泊松噪声是一种信号相关噪声，常见于低光照条件下的成像。 其分布服从泊松分布$P(k) = \frac{\lambda^{k} e^{-\lambda}}{k!}$ 
其中$\lambda$为原始像素值，$k$为噪声像素值
```python
def add_poisson_noise(image):
    vals = len(np.unique(image))
    vals = 2 ** np.ceil(np.log2(vals))
    noisy_image = np.random.poisson(image * vals) / float(vals)
    noisy_image = np.clip(noisy_image, 0, 255)
    noisy_image = noisy_image.astype(np.uint8)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/poisson_image.jpg) 

### 乘性噪声
乘性噪声是一种与信号强度成正比的噪声，常见模型如:
$$ g(x, y) = f(x, y) · \eta(x,y) \qquad \eta \sim U[a,b]$$
当然$\eta$也可以服从均值为0的高斯分布，也就是我们常见的散斑分布
```python
def add_multiplicative_noise(image, mean=0, std=0.1):
    row, col, ch = image.shape
    gauss = np.random.normal(mean, std, (row, col, ch))
    gauss = gauss.reshape(row, col, ch)
    noisy_image = image * gauss
    noisy_image = np.clip(noisy_image, 0, 255)
    noisy_image = noisy_image.astype(np.uint8)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/multiplicative_image.jpg) 

### 均匀噪声
均匀噪声是一种加性噪声，服从均匀分布:
$$ g(x, y) = f(x, y) + \eta(x,y) \qquad \eta \sim U[a,b]$$
```python
def add_uniform_noise(image, low=-50, high=50):
    row, col, ch = image.shape
    uniform_noise = np.random.uniform(low, high, (row, col, ch))
    noisy_image = image + uniform_noise
    noisy_image = np.clip(noisy_image, 0, 255)
    noisy_image = noisy_image.astype(np.uint8)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/uniform_image.jpg) 

### 周期噪声
周期噪声由电子干扰引起，表现为规则的正弦模式噪声:
$$ n(x, y) = A · \sin(2\pi (ux + vy) + \phi) $$
其中$A$是振幅，$u$,$v$为频率，$\phi$为相位。
```python
def add_periodic_noise(image, frequency=50, amplitude=50):
    row, col, ch = image.shape
    x = np.arange(0, col)
    y = np.arange(0, row)
    X, Y = np.meshgrid(x, y)
    # 生成单通道噪声
    noise = amplitude * np.sin(2 * np.pi * frequency * X / col)
    # 将噪声扩展到三通道
    noise = np.stack([noise, noise, noise], axis=-1)
    # 添加噪声到图像
    noisy_image = image + noise
    noisy_image = np.clip(noisy_image, 0, 255)  # 确保像素值在 0-255 范围内
    noisy_image = noisy_image.astype(np.uint8)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/periodic_image.jpg)

### 混合噪声
混合噪声就是常见的几种噪声混合起来的形式，这里就不用多说了。
```python
def add_mixed_noise(image):
    noisy_image = add_gaussian_noise(image, std=20)
    noisy_image = add_salt_pepper_noise(noisy_image)
    return noisy_image
```
示例:
![lena_gaussian.jpg](https://fa135av3.dev.cdn.imgeng.in/blog/Images/picture_denoising/mixed_image.jpg) 

## 指标
### **PSNR（峰值信噪比）**
- **公式**：  
  $$ \text{PSNR} = 20 \log_{10}\left(\frac{255}{\sqrt{\text{MSE}}}\right) $$
- **意义**：量化像素级差异，值越高（通常>30dB）表示去噪效果越好。
- **特点**：计算简单，但对人眼感知不敏感。

### **SSIM（结构相似性指数）**
- **公式**：  
  亮度（$\mu$）、对比度（$\sigma$）、结构（$\sigma_{xy}$）三部分相乘：
  $$
  \text{SSIM} = \frac{(2\mu_x\mu_y + C_1)(2\sigma_{xy} + C_2)}{(\mu_x^2 + \mu_y^2 + C_1)(\sigma_x^2 + \sigma_y^2 + C_2)}
  $$
  - $\mu_x, \mu_y$：图像均值（亮度）  
  - $\sigma_x, \sigma_y$：标准差（对比度）  
  - $\sigma_{xy}$：协方差（结构相似性）  
  - $C_1=(k_1L)^2, C_2=(k_2L)^2$：常数（$L$为像素范围，通常$k_1=0.01, k_2=0.03$）

- **意义**：值域 [0,1]，越接近 1 表示结构保留越好。
- **特点**：综合评估纹理、边缘和对比度的保持能力。

### **MSE（均方误差）**
- **公式**：  
  $$ \text{MSE} = \frac{1}{N}\sum (x_i - y_i)^2 $$
- **意义**：直接反映像素平均差异，值越小越好。
- **特点**：忽略空间结构，对异常值敏感。

### **EPI（边缘保持指数）**
- **公式**：  
  $$ \text{EPI} = \frac{\sum|\nabla\text{去噪} - \nabla\text{原图}|}{\sum|\nabla\text{原图}|} $$
- **意义**：评估边缘保留能力，值越小（理想为0）表示细节损失少。
- **特点**：专用于检测边缘模糊，但对噪声类型敏感。

### **LPIPS（感知相似度）**
- **原理**：基于预训练VGG网络的特征距离。  
  $$ \text{LPIPS} = \|\phi(x) - \phi(y)\|_2 $$
- **意义**：值越低表示视觉越接近，反映高阶语义相似性。
- **特点**：计算复杂需GPU，依赖深度学习模型。

## 指标对比
| 指标类型       | 代表指标  | 核心意义                | 计算复杂度  |
|----------------|-----------|-------------------------|-------------|
| 像素差异       | PSNR/MSE  | 全局像素误差            | 低          |
| 结构相似性     | SSIM      | 纹理/边缘保留           | 中          |
| 边缘保留       | EPI       | 细节破坏程度            | 中          |
| 感知质量       | LPIPS     | 人眼视觉相似性          | 高          |

```python
import cv2
import numpy as np
import lpips
import torch
from skimage.metrics import structural_similarity as ssim

def PSNR(original, compressed):
    mse = np.mean((original - compressed) ** 2)
    if mse == 0:
        return 100
    max_pixel = 255.0
    psnr = 20 * np.log10(max_pixel / np.sqrt(mse))
    return psnr

def SSIM(original, denoised):
    # 使用 `channel_axis` 参数替代已弃用的 `multichannel`
    return ssim(original, denoised, channel_axis=-1)

def MSE(original, compressed):
    mse = np.mean((original - compressed) ** 2)
    return mse

def EPI(original, denoised):
    # 将图像转换为灰度图
    gray_original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
    gray_denoised = cv2.cvtColor(denoised, cv2.COLOR_BGR2GRAY)
    
    # 计算 Sobel 梯度
    sobel_original = cv2.Sobel(gray_original, cv2.CV_64F, 1, 1, ksize=3)
    sobel_denoised = cv2.Sobel(gray_denoised, cv2.CV_64F, 1, 1, ksize=3)
    
    # 计算 EPI
    return np.sum(np.abs(sobel_denoised - sobel_original)) / np.sum(np.abs(sobel_original))

# 初始化 LPIPS 模型
loss_fn = lpips.LPIPS(net='vgg')

def LPIPS(original, denoised):
    # 将图像转换为 PyTorch 张量并归一化
    original_torch = torch.from_numpy(original).permute(2, 0, 1).unsqueeze(0).float() / 255.0
    denoised_torch = torch.from_numpy(denoised).permute(2, 0, 1).unsqueeze(0).float() / 255.0
    
    # 计算 LPIPS
    return loss_fn(original_torch, denoised_torch).item()

def evaluate(original, compressed):
    psnr = PSNR(original, compressed)
    ssim_val = SSIM(original, compressed)  # 避免与函数名冲突
    mse = MSE(original, compressed)
    epi = EPI(original, compressed)
    lpips_val = LPIPS(original, compressed)  # 避免与函数名冲突
    
    # 打印结果
    print(f"PSNR: {psnr}, SSIM: {ssim_val}, MSE: {mse}, EPI: {epi}, LPIPS: {lpips_val}")
    return psnr, ssim_val, mse, epi, lpips_val
```