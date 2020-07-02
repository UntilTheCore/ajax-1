// 请求CSS内容
reqCSS.onclick = e => {
    myHttpRequest('get','/style.css',function(xhr) {
        let css = document.createElement('style')
        css.innerHTML = xhr.response
        const head = document.querySelector('head')
        head.appendChild(css)
    })
}

// 请求HTML内容
reqHTML.onclick = e => {
    myHttpRequest('get','3.html',(xhr) => {
        let template = document.createElement('template')
        template.innerHTML = xhr.response
        document.body.appendChild(template.content.firstChild)
    })
}

// 请求JS内容
// js 会在添加到 DOM 时直接调用里面的代码
reqJS.onclick = e => {
    myHttpRequest('get','2.js',(xhr) => {
        const script = document.createElement('script')
        script.innerHTML = xhr.response
        document.body.appendChild(script)
    })
}

// 请求XML内容
reqXML.onclick = e => {
    myHttpRequest('get','4.xml', xhr => {
        console.dir(xhr.responseXML.getElementsByTagName('name')[0].textContent)
    })
}

// 请求 JSON 内容
reqJSON.onclick = e => {
    myHttpRequest('get','5.json', xhr => {
        const obj = JSON.parse(xhr.response)
        console.log(obj)
    })
}

let n = 1
// 请求分页内容
reqPage.onclick = e => {
    myHttpRequest('get',`page${n + 1}`, xhr => {
        let arr = JSON.parse(xhr.response)
        let result = arr.map(item => `<li>${item.id}</li>`).join('')
        xxx.innerHTML = result
        n = (n + 1) >= 3 ? 1 : (n + 1)
    })
}


function myHttpRequest(method,url,fn) {
    let xhr = new XMLHttpRequest()
    xhr.open(method,url)
    xhr.onreadystatechange = e => {
        if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 300) {
            fn(xhr)
        }else if(xhr.status === 404) {
            alert(`请求${url}失败!`)
        }
    }
    xhr.send()
}