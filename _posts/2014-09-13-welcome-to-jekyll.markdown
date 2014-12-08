---
layout: post
title:  "Welcome to my new blog!"
date:   2014-09-13 16:16:22
categories: blog update
---
这是第一篇来到这边的博文，以前的地址是[新浪的博客][sina]。本来想第一篇就琐碎的写点什么就可以了，后来想到：搬家到这边也不太容易。前前后后花了三个晚上。所以打算把这途中遇到的问题之类的分享给大家。

# 创建经历
起因：由于之前就不太喜欢新浪那边的博客，总是想着自己弄个域名，可又觉得繁琐。突然在网上看到了说使用jekyll创建博客，是写博客的[第三阶段][otherblog]，还有什么像黑客一样写博客之类的，很感兴趣。进去大致了解了一下就决定搬家了。

过程：首先baidu了一圈jekyll，然后上[官网][jekyll]又看了一圈。看到上边不建议用windows，于是就决定用我的macbook来弄。等到下班回家便开始弄，结果刚要开始就遇到了问题。

* 打开终端，输入gem install jekyll。结果是You don't have permission to access /ruby
    系统自带ruby没有写权限。折腾了一晚上又google，又stackoverflow的。基本上是要放弃使用系统自带ruby。安装个ruby版本管理工具。最开始想用rbenv，不过在安装时候downloading总是太慢，后来就放弃而选用了RVM。
* RVM安装时候ruby，总是不能下载完成。
    不过我发现，再次输入时候就少了一个需要安装的库。所以我就一直按了许多次，最终安装成功了，不知道还会不会遇到这个问题。
* github page 申请
    这边要注意名字一定跟注册的名字一样哦，不过在github的setting 里可以修改哦。
* markdown语法
    还真是不太了解这markdown，跟我一样小白的同学可以百度找个[在线编辑][markdown]的，上边基本上把所有的语法功能都表现了一下。
* 至于主题，还是慢慢来等以后再研究研究再换。这边就先试发下这个看看效果吧。

# 一些功能展示

对于代码加亮，如下：
{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}


[sina]:        http://blog.sina.com.cn/tishoy
[otherblog]:   http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html
[markdown]:    http://mahua.jser.me
[jekyll]:      http://jekyllcn.com
