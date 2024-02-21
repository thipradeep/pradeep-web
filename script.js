function resizePDF() {
    var fileInput = document.getElementById('fileInput');
    var progressBar = document.getElementById('progressBar');
    var previewContainer = document.getElementById('previewContainer');
    var files = fileInput.files;

    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var formData = new FormData();
            formData.append('file', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/resize', true);

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    progressBar.value = percentComplete;
                }
            };

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var resizedPDFUrl = xhr.responseText;
                    var previewElement = document.createElement('embed');
                    previewElement.setAttribute('src', resizedPDFUrl);
                    previewElement.setAttribute('type', 'application/pdf');
                    previewElement.setAttribute('width', '100%');
                    previewElement.setAttribute('height', '500px');
                    previewContainer.appendChild(previewElement);
                } else {
                    alert('Error resizing PDF. Please try again later.');
                }
            };

            xhr.send(formData);
        }
    } else {
        alert('Please select at least one PDF file.');
    }
}
