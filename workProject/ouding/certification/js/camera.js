/**
 * Created by facebank on 2017/1/18.
 */
(function () {
    var takePicture = document.querySelector("#take-picture"),
        takePicture_re = document.querySelector("#take-picture-re"),
        showPicture = document.querySelector("#show-picture");
    var MAX_HEIGHT = 100;
    // 参数，最大高度
    if (takePicture && showPicture&&takePicture_re) {
// Set events
        takePicture.onchange = function (event) {
// Get a reference to the taken picture o-r chosen file
            $("#first").hide();
            $("#repeat").show();
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
// Get window.URL object
                    var URL = window.URL || window.webkitURL;
// Create ObjectURL
                    var imgURL = URL.createObjectURL(file);
// Set img src to ObjectURL
                    showPicture.src = imgURL;
// Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                    render(imgURL);
                }
                catch (e) {
                    try {
// Fallback if createObjectURL is not suppo-rted
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                            render(event.target.result);
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
//
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }

            }

        };

        takePicture_re.onchange = function (event) {
// Get a reference to the taken picture o-r chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
// Get window.URL object
                    var URL = window.URL || window.webkitURL;
// Create ObjectURL
                    var imgURL = URL.createObjectURL(file);
// Set img src to ObjectURL
                    showPicture.src = imgURL;
// Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                    render(imgURL);
                }
                catch (e) {
                    try {
// Fallback if createObjectURL is not suppo-rted
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                            render(event.target.result);
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
//
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
    }

    function render(src){
        // 创建一个 Image 对象
        var image = new Image();
        // 绑定 load 事件处理器，加载完成后执行
        image.onload = function(){
            // 获取 canvas DOM 对象
            var canvas = document.getElementById("canvas");
            // 如果高度超标
            if(image.height > MAX_HEIGHT) {
                // 宽度等比例缩放 *=
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            // 获取 canvas的 2d 环境对象,
            // 可以理解Context是管理员，canvas是房子
            var ctx = canvas.getContext("2d");
            // canvas清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 重置canvas宽高
            canvas.width = image.width;
            canvas.height = image.height;
            // 将图像绘制到canvas上
            ctx.drawImage(image, 0, 0, image.width, image.height);
            // !!! 注意，image 没有加入到 dom之中
        };
        // 设置src属性，浏览器会自动加载。
        // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
        image.src = src;
    }

})();
