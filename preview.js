import "https://cdn.jsdelivr.net/npm/marked/marked.min.js"
// インプットボックスの変更時のイベントリスナー
const filename =document.getElementById('filename')
  if(filename){
    filename.onchange = function() {
        // インプットボックスから値を取得
        var value = this.value;
        
        // 現在のURLを取得
        var currentUrl = window.location.href;
        
        // クエリパラメータを追加してURLを更新
        var newUrl = currentUrl + '&q=' + encodeURIComponent(value);
        window.location.href = newUrl;
    };
  }

// ページのロード時に`q`パラメータがある場合の処理
window.addEventListener('load',load)
function load(){
    // URLのクエリパラメータを取得
    var urlParams = new URLSearchParams(window.location.search);
    var value = urlParams.get('q');
    
    // `q`パラメータが存在する場合
    if (value) {
        // マークダウンファイルをフェッチ
        fetch(value)
            .then(response => response.text())
            .then(md => {
                // マークダウンをHTMLに変換              
                var html = marked.parse(md);
                
                // `main`要素を取得してHTMLを挿入
                var main = document.querySelector('main');
                main.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching the markdown file:', error);
            });
    }
};
