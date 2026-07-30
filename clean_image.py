import numpy as np
from PIL import Image, ImageFilter, ImageDraw

def build_spotless_canvas():
    img = Image.open("public/images/IMG_9318.JPG").convert("RGB")
    width, height = img.size
    img_np = np.array(img, dtype=np.float32)
    
    # 1. Full text corridor bounds
    x1, x2 = 120, 966
    y1, y2 = 180, 1340
    
    top_color = np.array([255.0, 251.0, 238.0])
    mid_color = np.array([255.0, 246.0, 222.0])
    bot_color = np.array([244.0, 228.0, 202.0])
    
    result_np = img_np.copy()
    
    for y in range(y1, y2):
        v = (y - y1) / (y2 - y1)
        
        if v < 0.45:
            base_col = top_color * (1.0 - v / 0.45) + mid_color * (v / 0.45)
        else:
            base_col = mid_color * (1.0 - (v - 0.45) / 0.55) + bot_color * ((v - 0.45) / 0.55)
            
        for x in range(x1, x2):
            h_dist = abs(x - (width / 2.0)) / ((x2 - x1) / 2.0)
            edge_weight = max(0.0, min(1.0, (h_dist - 0.85) / 0.15))
            
            alpha = (1.0 - edge_weight)
            result_np[y, x] = img_np[y, x] * (1.0 - alpha) + base_col * alpha

    res_img = Image.fromarray(np.clip(result_np, 0, 255).astype(np.uint8))
    
    # Precise tight mask
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    draw.rectangle([x1 + 5, y1 + 5, x2 - 5, y2 - 5], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=6))
    
    final_img = Image.composite(res_img, img, mask)
    final_img.save("public/images/IMG_9318_clean.JPG", quality=96)
    print("100% Spotless canvas saved successfully!")

build_spotless_canvas()
