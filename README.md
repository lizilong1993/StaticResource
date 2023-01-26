# StaticResource

> - 2023-01-26 **添加了评论系统emoji**
> - 2023-01-22 **添加了部分网站的favicon**
> - 2023-01-20 **添加了部分badges**
> - 2023-01-19 创建仓库

> 建议去CDN提供商处获取jQuery库之类的库的远程地址。
>
> hexo-theme-webstack的部分源代码，为了构建单页导航时远程引用之用。

## 建仓库的原因

本人使用的是Hexo+Butterfly+github pages的博客建站路线，我想在我的博客中插入一个单页的的网址导航页，并且我不想让这个nav.html引入本地的文件，因此建了这个仓库当做远程资源使用，建议配合jsDelivr使用。

## 使用方法

> 欢迎大家使用~~

本人使用的方案是hexo+webstack生成个人导航站，具体步骤参考[如何快速构建一个单页个人导航网站](https://lizilong.netlify.app/posts/6e0d)。
1. 选择你需要的文件，如`StaticResource/blob/gh-pages/js/footer.js`
2. copy 浏览器上显示的地址，如`https://github.com/lizilong1993/StaticResource/blob/gh-pages/js/footer.js`
3. 打开[jsDelivr](https://www.jsdelivr.com/github)，将地址填入`Github`,下面（JSDELIVR）会生成一个新网址,这是一个CDN地址，国内用户推荐使用
4. 将该CDN网址或原始地址放到你需要的地方(js/css/images等都可以替换)。例如
```yaml
# NavRoot\nav\_config.webstack.yml最底部的代码
js:
  header: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/header.js
  footer: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/footer.js
  jquery: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/jquery-1.11.1.min.js
  bootstrap: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/bootstrap.min.js
  TweenMax: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/TweenMax.min.js
  resizeable: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/resizeable.min.js
  joinable: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/joinable.js
  xenonApi: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/xenon-api.min.js
  xenonToggles: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/xenon-toggles.min.js
  xenonCustom: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/xenon-custom.min.js
  lozad: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/lozad.min.js
  html5shiv: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/html5shiv.min.js
  respond: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/js/respond.min.js
  busuanzi: https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js

css:
  hclonely: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/hclonely.css
  fonts: //fonts.loli.net/css?family=Arimo:400,700,400italic
  linecons: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/fonts/linecons/css/linecons.min.css
  fontawesome: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/fonts/fontawesome/css/all.min.css
  bootstrap: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/bootstrap.min.css
  xenonCore: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/xenon-core.min.css
  xenonComponents: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/xenon-components.min.css
  xenonSkins: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/xenon-skins.min.css
  nav: https://cdn.jsdelivr.net/gh/lizilong1993/StaticResource@main/css/nav.min.css

```
5. 如果不想使用本地的flag-cn.png文件的话，建议修改这里
```yaml
flag:
  - name: Chinese
    default: true
    icon:  # 删除flag-cn,否则这里会去读/images/flags/flag-cn.png，我们需要去远程获取而不是本地读取
    index: /
```
## 效果
[Demo](https://lizilong.netlify.app/nav.html)
![image](https://user-images.githubusercontent.com/25758122/213121466-cbe15ffb-49b5-4bf6-8d59-27b66d3ff20c.png)
## 欢迎提交PR
欢迎提交PR，将本静态资源仓库🧨🧨🧨*做大做强* 🧨🧨🧨
