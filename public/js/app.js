(function(){
    //文件选择器的change事件
    $('#fileToUpload').on('change', function(e){
        var file = this.files[0];
        if(file) {
            var fileSize = 0;
            if(file.size > 1024*1024) {
                fileSize = (Math.round(file.size * 100 /(1024*1024))/100).toString() + 'MB';
            } else {
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            }

            $('#fileName').html('Name: ' + file.name);
            $('#fileSize').html('Size: ' + fileSize);
            $('#fileType').html('Type: ' + file.type);
        }


    });

    $('#form1').on('submit', function(e){
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        var fd = new FormData();

        fd.append('enctype', 'multipart/form-data');
        fd.append('fileToUpload', $('#fileToUpload')[0].files[0]);

        // event listners
        xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        //Be sure to change the url below to the url of your upload server side script
        xhr.open("POST", "/upload");
        xhr.send(fd);

    });

    function uploadProgress(evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
        }
        else {
            document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText);
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.");
    }

    function uploadCanceled(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
    }
})();