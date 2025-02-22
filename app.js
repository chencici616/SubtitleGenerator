// 字幕生成器主程序
// 实现功能：
// 1. 图片上传和预览
// 2. 字幕样式自定义（字体、大小、颜色）
// 3. 多行字幕生成，支持在原图底部和扩展区域显示
// 4. 生成结果下载，自动添加时间戳

// 当DOM完全加载后执行初始化
document.addEventListener('DOMContentLoaded', () => {
    // 获取页面上的所有重要元素
    const uploadButton = document.getElementById('upload-button'); // 上传按钮
    const fileInput = document.getElementById('file-input'); // 文件输入框，隐藏的实际文件选择器
    const previewImage = document.getElementById('preview-image'); // 预览图片元素
    const resultImage = document.getElementById('result-image'); // 生成结果图片元素
    const subtitleText = document.getElementById('subtitle-text'); // 字幕文本输入框
    const generateBtn = document.getElementById('generate-btn'); // 生成字幕按钮
    const downloadBtn = document.getElementById('download-btn'); // 下载按钮

    // 获取字幕样式控制元素
    const fontSizeInput = document.getElementById('font-size'); // 字体大小输入框
    const fontColorInput = document.getElementById('font-color'); // 字体颜色选择器
    const fontFamilySelect = document.getElementById('font-family'); // 字体样式下拉选择框

    // 点击上传按钮时触发文件选择框
    uploadButton.addEventListener('click', () => {
        fileInput.click(); // 模拟点击隐藏的文件输入框，打开文件选择对话框
    });

    // 监听文件选择变化事件
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0]; // 获取用户选择的第一个文件
        if (file) {
            handleImageUpload(file); // 处理选中的图片文件
        }
    });

    // 处理图片上传和预览功能
    function handleImageUpload(file) {
        const reader = new FileReader(); // 创建文件读取器实例
        reader.onload = (e) => {
            previewImage.src = e.target.result; // 设置预览图片的源为读取的文件内容
            previewImage.style.display = 'block'; // 显示预览图片
            resultImage.style.display = 'none'; // 隐藏之前的结果图片
            generateBtn.disabled = false; // 启用生成按钮
        };
        reader.readAsDataURL(file); // 以Data URL的形式读取文件，触发onload事件
    }

    // 监听生成按钮点击事件，处理字幕生成逻辑
    generateBtn.addEventListener('click', () => {
        // 获取字幕文本并按行分割，移除空行
        const lines = subtitleText.value.trim().split('\n').filter(line => line.trim());
        if (lines.length === 0) return; // 如果没有有效的字幕文本则返回

        // 创建画布用于生成图片
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d'); // 获取2D绘图上下文

        // 获取用户设置的字幕样式参数
        const fontSize = parseInt(fontSizeInput.value); // 字体大小
        const fontColor = fontColorInput.value; // 字体颜色
        const fontFamily = fontFamilySelect.value; // 字体样式
        const lineSpacing = fontSize * 0.5; // 设置行间距为字体大小的一半

        // 计算字幕区域的尺寸
        const singleSubtitleHeight = fontSize * 2; // 单行字幕高度（包含背景）
        const totalSubtitlesHeight = (lines.length - 1) * singleSubtitleHeight; // 除第一行外的字幕区域总高度

        // 设置画布尺寸
        canvas.width = previewImage.naturalWidth; // 设置画布宽度与原图相同
        canvas.height = previewImage.naturalHeight + totalSubtitlesHeight; // 原图高度加上额外字幕区域高度

        // 将原图绘制到画布上
        ctx.drawImage(previewImage, 0, 0);

        // 准备字幕背景参数
        const backgroundHeight = singleSubtitleHeight; // 背景高度等于单行字幕高度
        const backgroundY = previewImage.naturalHeight - backgroundHeight; // 背景在原图中的起始位置
        
        // 为每行字幕绘制半透明背景
        // 第一行显示在原图底部，后续行依次向下叠加
        lines.forEach((line, index) => {
            const targetY = index === 0 
                ? previewImage.naturalHeight - singleSubtitleHeight // 第一行位置
                : previewImage.naturalHeight + (index - 1) * singleSubtitleHeight; // 后续行位置
            // 从原图底部复制区域作为字幕背景
            // 通过drawImage实现背景效果，保持与原图风格一致
            ctx.drawImage(
                previewImage,
                0, backgroundY, // 源图像的裁剪起点
                previewImage.naturalWidth, backgroundHeight, // 源图像的裁剪尺寸
                0, targetY, // 目标位置
                previewImage.naturalWidth, singleSubtitleHeight // 目标尺寸
            );
        });

        // 配置字幕文字样式
        ctx.font = `${fontSize}px ${fontFamily}`; // 设置字体大小和字体族
        ctx.textAlign = 'center'; // 设置文字水平居中对齐
        ctx.textBaseline = 'middle'; // 设置文字垂直居中对齐

        // 绘制每行字幕文字
        lines.forEach((line, index) => {
            // 计算每行字幕的垂直位置（居中对齐）
            const y = index === 0
                ? previewImage.naturalHeight - singleSubtitleHeight / 2 // 第一行文字位置
                : previewImage.naturalHeight + (index - 1) * singleSubtitleHeight + singleSubtitleHeight / 2; // 后续行文字位置
            ctx.fillStyle = fontColor; // 设置文字颜色
            ctx.fillText(line, canvas.width / 2, y); // 在画布上绘制文字
        });

        // 显示生成结果
        resultImage.src = canvas.toDataURL('image/jpeg'); // 将画布内容转换为JPEG格式的图片URL
        resultImage.style.display = 'block'; // 显示结果图片
        previewImage.style.display = 'none'; // 隐藏预览图片
        downloadBtn.disabled = false; // 启用下载按钮
    });

    // 处理图片下载功能
    downloadBtn.addEventListener('click', () => {
        try {
            // 确保有上传的文件
            if (!fileInput.files || !fileInput.files[0]) {
                console.error('没有找到上传的文件');
                return;
            }

            // 获取原始文件名（从上传的文件名中提取）
            const originalFileName = fileInput.files[0].name.split('.')[0];

            // 获取当前时间并格式化为字符串（精确到秒）
            const now = new Date();
            const dateStr = [
                now.getFullYear(),
                String(now.getMonth() + 1).padStart(2, '0'), // 月份补零
                String(now.getDate()).padStart(2, '0') // 日期补零
            ].join('');
            
            const timeStr = [
                String(now.getHours()).padStart(2, '0'), // 小时补零
                String(now.getMinutes()).padStart(2, '0'), // 分钟补零
                String(now.getSeconds()).padStart(2, '0') // 秒数补零
            ].join('');

            // 构建新的文件名：原始文件名_字幕_YYYYMMDD_HHMMSS.jpg
            const newFileName = `${originalFileName}_字幕_${dateStr}_${timeStr}.jpg`;
            
            // 验证文件名格式是否符合规范
            if (!newFileName.match(/^.+_字幕_\d{8}_\d{6}\.jpg$/)) {
                throw new Error('文件名格式生成错误');
            }

            // 创建临时下载链接并触发下载
            const link = document.createElement('a');
            link.download = newFileName; // 设置下载文件名
            link.href = resultImage.src; // 设置下载链接为生成的图片URL
            document.body.appendChild(link); // 临时将链接添加到文档中
            link.click(); // 模拟点击下载
            document.body.removeChild(link); // 清理临时元素
        } catch (error) {
            console.error('下载图片时出错:', error);
        }
    });
});