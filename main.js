// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索框元素
    const searchInput = document.getElementById('search');
    
    // 搜索功能
    searchInput.addEventListener('input', function() {
        // 获取输入的搜索关键词
        const searchTerm = this.value.toLowerCase().trim();
        
        // 获取所有书签项
        const bookmarkItems = document.querySelectorAll('.bookmark-item');
        const bookmarkSections = document.querySelectorAll('.bookmark-section');
        
        // 如果搜索词为空，显示所有分类和书签
        if (searchTerm === '') {
            bookmarkSections.forEach(section => {
                section.style.display = 'block';
            });
            
            bookmarkItems.forEach(item => {
                item.style.display = 'flex';
            });
            return;
        }
        
        // 统计每个分类中匹配的数量
        let sectionMatches = {};
        
        // 遍历所有书签项并进行筛选
        bookmarkItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const section = item.closest('.bookmark-section');
            const sectionId = section.querySelector('h2').textContent;
            
            // 初始化分类匹配计数
            if (!sectionMatches[sectionId]) {
                sectionMatches[sectionId] = 0;
            }
            
            // 如果标题或描述包含搜索关键词，显示该书签项，否则隐藏
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'flex';
                sectionMatches[sectionId]++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // 如果分类下没有匹配项，隐藏整个分类
        bookmarkSections.forEach(section => {
            const sectionId = section.querySelector('h2').textContent;
            if (sectionMatches[sectionId] > 0) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    // 获取所有书签项的网站图标
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    bookmarkItems.forEach(item => {
        const link = item.getAttribute('href');
        const imgElement = item.querySelector('.bookmark-icon img');
        
        // 如果链接有效且图像元素存在
        if (link && link !== '#' && imgElement) {
            // 尝试使用favicon API获取图标
            try {
                const domain = new URL(link).hostname;
                const fallbackIcon = imgElement.getAttribute('src');
                
                // 检查图标是否已存在
                if (!imgElement.src.includes('favicon.ico')) {
                    imgElement.setAttribute('src', `https://${domain}/favicon.ico`);
                    imgElement.setAttribute('onerror', `this.src='${fallbackIcon || 'images/default-icon.png'}'`);
                }
            } catch (e) {
                console.log('无效URL或无法解析图标:', link);
            }
        }
    });
});
