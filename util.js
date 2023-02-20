// 版本号比较1
function isEffectiveVersion(Version, base) {
    var newVersion = Version.split('.');
    var baseVersion = base.split('.');
    var flag = false;
    var loopFlag = true;
    for (var i = 0; i <= newVersion.length; i++) {
        if (loopFlag) {
            if (+newVersion[i] > +(baseVersion[i] || '')) {
                flag = true;
                loopFlag = false;
            } else if (+newVersion[i] < +(baseVersion[i] || '')) {
                flag = false;
                loopFlag = false;
            }
        }
    }
    return flag;
}

// 版本号比较2
function compareVersion(version1, version2) {
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    console.log(v1, v2);
    for (let i = 0; i < v1.length || i < v2.length; ++i) {
        let x = 0,
            y = 0;
        if (i < v1.length) {
            x = parseInt(v1[i]);
        }
        if (i < v2.length) {
            y = parseInt(v2[i]);
        }
        if (x > y) {
            return 1;
        }
        if (x < y) {
            return -1;
        }
    }
    return 0;
}

// 对象数组去重有唯一标识
function removeArrRepeat(arr, key) {
    let obj = {};
    arr = arr.reduce((pre, cur) => {
        obj[cur[key]] ? '' : (obj[cur[key]] = true && pre.push(cur));
        return pre;
    }, []);
    return arr;
}

// 对象数组去重无唯一标识
function removeRepeat(array) {
    // 比较对象相同
    function isObjectEqual(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            var propA = a[propName];
            var propB = b[propName];
            if (propA !== propB) {
                return false;
            }
        }
        return true;
    }
    let maps = [];
    return array.filter(item => !maps.find(i => isObjectEqual(i, item)) && maps.push(item));
}

// 删除url中指定参数
function delQueryString(url, paramKey) {
    if (url.indexOf('?') == -1) {
        return url;
    }
    let beforeUrl = url.substr(0, url.indexOf('?')); //?之前主地址
    let afterUrl = url.substr(url.indexOf('?') + 1); //？之后参数路径
    let nextUrl = '';
    let arr = new Array();
    if (afterUrl != '') {
        let urlParamArr = afterUrl.split('&'); //将参数按照&符分成数组
        for (let i = 0; i < urlParamArr.length; i++) {
            let paramArr = urlParamArr[i].split('='); //将参数键，值拆开
            //如果键雨要删除的不一致，则加入到参数中
            if (paramArr[0] !== paramKey) {
                arr.push(urlParamArr[i]);
            }
        }
    }
    if (arr.length > 0) {
        nextUrl = '?' + arr.join('&');
    }
    url = beforeUrl + nextUrl;
    return url;
}

// 深拷贝
function deepCopy(data) {
    function typeOf(obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object',
        };
        return map[toString.call(obj)];
    }
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

// 实现复制
const copyText = async val => {
    if (navigator.clipboard && navigator.permissions) {
        await navigator.clipboard.writeText(val);
    } else {
        const textArea = document.createElement('textArea');
        textArea.value = val;
        textArea.style.width = 0;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999px';
        textArea.style.top = '10px';
        textArea.setAttribute('readonly', 'readonly');
        document.body.appendChild(textArea);

        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
};

// 数组结构转树结构，默认以id和parentId转换(options为可选配置参数：id为唯一标识符,parentId为父节点标识符;key保持为null或不传)
function arrayToTree(data, options = {}, key = null) {
    let { id = 'id', parentId = 'parentId' } = options;
    let tree = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
        if (data[i][parentId] == key) {
            let obj = data[i];
            temp = arrayToTree(data, options, data[i][id]);
            if (temp.length > 0) {
                obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
}

// 树结构转数组结构，默认以children转换(options为可选配置参数)
function treeToArray(data, options = {}) {
    let { children = 'children' } = options;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr.push(data[i]);
        if (data[i][children] && data[i][children].length > 0) {
            let childs = treeToArray(data[i][children], options);
            arr = [...arr, ...childs];
        }
    }
    return arr;
}

// 根据key获取url参数
function getUrlKey(key) {
    var url = window.location;
    var param = '';
    var arr = (url.href.split('?')[1] || '').split('&');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            var temp = arr[i].match(/([^=|.]*)=(.*)/);
            if (key == temp[1]) {
                param = temp[2];
            }
        }
    }
    param = decodeURIComponent(param || '');
    return param;
}

// 判断客户端系统
function judgeClient() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
    if (isAndroid) {
        return 'Android';
    } else if (isIOS) {
        return 'IOS';
    } else {
        return 'PC';
    }
}

// ajax发送请求
function request(type, url, data) {
    return $.ajax({
        type: type,
        url: url,
        contentType: 'application/json',
        datatype: 'json',
        data: JSON.stringify(data),
        error: function (err) {
            console.log(err);
            window.JSHandle.toast('出错了~');
        },
    });
}

// 判断不同平台
function getUaInfo() {
    const ua = navigator.userAgent.toLowerCase();
    const Agents = ['Android', 'android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let isPc = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.includes(Agents[i])) {
            isPc = false;
            break;
        }
    }
    return {
        // 是不是ios
        isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || ua.includes('mac os x'),
        // 是不是安卓
        isAndroid: ua.includes('android') || ua.includes('Android') || ua.includes('Adr'),
        // 是不是微信环境
        isWeixin: ua.match(/MicroMessenger/i) == 'micromessenger',
        // 是不是电脑端
        isPc: isPc,
    };
}

// 时间格式转换
// Date转yyyy-MM-dd HH:mm:ss
const filterTimeByDate = (date, pattern = 'yyyy-MM-dd HH:mm:ss') => {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    if (/(y+)/.test(pattern)) {
        pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(pattern)) {
            pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return pattern;
};

// 时间戳转yyyy-MM-dd HH:mm:ss
const timestampToTime = timestamp => {
    const date = new Date(String(timestamp).length > 10 ? timestamp : timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
};

// yyyy-MM-dd HH:mm:ss转时间戳
const timeToTimestamp = (time, isMilli = true) => {
    const timestamp = new Date(time).getTime(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    return isMilli ? timestamp : timestamp / 1000;
};

// 函数防抖
const debounce = (fn, delay = 300) => {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
};

// 节流
const throttle = (fn, delay = 300) => {
    let timer = null;
    return function () {
        if (timer == null) {
            timer = setTimeout(() => {
                fn();
                clearTimeout(timer);
                timer = null;
            }, delay);
        }
    };
};

// 下载文件（excel）
const ajaxDownloadExcel = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance
            .post(url, params, {
                responseType: 'blob',
            })
            .then(res => {
                console.log(res);
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    let blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel',
                    });
                    window.navigator.msSaveOrOpenBlob(blob, params.fileName);
                } else {
                    /* 火狐谷歌的文件下载方式 */
                    const blob = new Blob([res.data]);
                    let downloadElement = document.createElement('a');
                    let href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = params.fileName;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                }
            })
            .catch(error => {
                console.log(url, error);
                reject(error);
            });
    });
};

// 随机生成n位随机数
const createRandom = n => {
    return Math.floor(Math.random() * 9 * Math.pow(10, n - 1) + Math.pow(10, n - 1));
};

// 字节流转图片
const formatByte2Img = data => {
    let blobUrl = '';
    const bytes = new Uint8Array(data);
    const blob = new Blob([bytes], { type: 'image/png' });
    blobUrl = (window.URL || window.webkitURL).createObjectURL(blob);
    return blobUrl;
};

// 获取字符串中的字符数
const characterCount = (str, char) => str.split(char).length - 1;

// 在元素后插入 HTML 字符串
const insertHTMLAfter = (html, el) => el.insertAdjacentHTML('afterend', html);

// 在网页上获取选定的文本
const getSelectedText = () => window.getSelection().toString();

// 获取移动端设备型号 ua:navigator.userAgent
function getDeviceModel(ua) {
    let device = '';
    if (ua.includes('Android')) {
        let m1 = ua.match(/Android.*; ?(.*(?= Build))/);
        if (m1 && m1.length > 1) {
            device = m1[1];
        }
    } else if (ua.includes('iPhone') || ua.includes('iPad')) {
        if (ua.includes('iPad')) {
            device = 'iPad';
        } else {
            device = 'iPhone';
        }
    }
    return device;
}

// 获取APP版本号 ua:navigator.userAgent
function getAppVersion(ua) {
    let str = ua.match(/appver.*?(?=;)/);
    if (str && str.length > 0) {
        appVersion = str[0].split('=')[1];
    }
    return appVersion || '';
}

// 监测播放器网络是wifi还是流量
var jsonStr = '{"callbackname": "onNetChange"}';
try {
    if (isIOS()) {
        window.eastmoney.emGetNetStatus(jsonStr);
    } else {
        prompt('emGetNetStatus', jsonStr);
    }
} catch (error) {}
window.onNetChange = function (json) {
    if (JSON.parse(json).type != 'Wifi') {
        $('.alert_net').removeClass('dn');
        setTimeout(function () {
            $('.alert_net').addClass('dn');
        }, 3000);
    }
};

// 解析url参数
const parseUrl = url => {
    const param = url.split('?')[1];
    if (param) {
        const search = new URLSearchParams('?' + param);
        console.log(search.keys());
        return [...search.keys()].reduce(
            (pre, cur, index) => ({
                ...pre,
                [cur]: [...search.values()][index],
            }),
            {},
        );
    }
    return null;
};

// 格式化时间
function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) return null;
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
            time = parseInt(time);
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/');
        }
        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        // @ts-ignore
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sundayday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
}

// 实现准时的定时器（通过每次执行获取系统时间校正，补偿下次间隔时间）
function timer(myfun, speed) {
    myfun();
    var counter = 1;
    var start = new Date().getTime();
    function instance() {
        myfun();
        var ideal = counter * speed,
            real = new Date().getTime() - start;
        counter++;
        var diff = real - ideal;
        setTimeout(function () {
            instance();
        }, speed - diff); // 通过系统时间进行修复
    }
    setTimeout(function () {
        instance();
    }, speed);
}

// 删除文件和文件夹
// 保留文件
const stayFile = ["package.json", "README.md"];
const delPath = async (path) => {
  let files = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    files.forEach(async (file) => {
      let curPath = resolve(path, file);

      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        if (file != "node_modules") await delPath(curPath);
      } else {
        // delete file
        if (!stayFile.includes(file)) {
          // 删除文件
          fs.unlinkSync(curPath);
        }
      }
    });

    // 删除文件夹
    if (path != `${pkgPath}/easyest`) fs.rmdirSync(path);
  }
};