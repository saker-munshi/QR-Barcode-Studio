document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('panel-'+t.dataset.tab).classList.add('active');
  });
});

let genType = 'qr';
document.querySelectorAll('.seg button').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.seg button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    genType = b.dataset.type;
    document.getElementById('barcodeFormatField').style.display = genType==='barcode' ? 'block':'none';
  });
});

const genStage = document.getElementById('genStage');
const genActions = document.getElementById('genActions');
const scanline = document.getElementById('scanline');
let lastCanvas = null;

document.getElementById('genBtn').addEventListener('click', ()=>{
  const text = document.getElementById('genInput').value.trim();
  if(!text){
    alert('Enter a link or some text first.');
    return;
  }
  genStage.innerHTML = '<div class="scanline" id="scanline"></div>';
  genStage.classList.remove('empty');

  const inner = document.createElement('div');
  inner.className = 'stage-inner';
  genStage.appendChild(inner);

  if(genType === 'qr'){
    new QRCode(inner, {
      text: text,
      width: 220,
      height: 220,
      correctLevel: QRCode.CorrectLevel.M
    });
    setTimeout(()=>{
      const img = inner.querySelector('img') || inner.querySelector('canvas');
      lastCanvas = inner.querySelector('canvas');
      genActions.style.display = 'flex';
    }, 60);
  } else {
    const format = document.getElementById('bcFormat').value;
    const canvas = document.createElement('canvas');
    inner.appendChild(canvas);
    try{
      JsBarcode(canvas, text, {
        format: format,
        lineColor: '#0d1210',
        width: 2,
        height: 90,
        displayValue: true,
        margin: 10
      });
      lastCanvas = canvas;
      genActions.style.display = 'flex';
    }catch(e){
      inner.innerHTML = '<div style="color:#ef5f5f; font-family:monospace; font-size:12px; padding:20px; max-width:220px;">'+e.message+'</div>';
      genActions.style.display = 'none';
    }
  }

  const sl = document.getElementById('scanline');
  requestAnimationFrame(()=>{ sl.classList.add('run'); });
});

document.getElementById('downloadBtn').addEventListener('click', ()=>{
  let canvas = lastCanvas;
  if(!canvas){
    canvas = genStage.querySelector('canvas');
  }
  if(!canvas){
    const img = genStage.querySelector('img');
    if(img){
      const c = document.createElement('canvas');
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img,0,0);
      canvas = c;
    }
  }
  if(!canvas) return;
  const a = document.createElement('a');
  a.download = (genType==='qr' ? 'qrcode' : 'barcode') + '.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
});

document.getElementById('clearGenBtn').addEventListener('click', ()=>{
  document.getElementById('genInput').value = '';
  genStage.innerHTML = '<div class="scanline" id="scanline"></div>';
  genStage.classList.add('empty');
  genActions.style.display = 'none';
  lastCanvas = null;
});

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imgPreviewWrap = document.getElementById('imgPreviewWrap');
const imgPreview = document.getElementById('imgPreview');
const decodeBtn = document.getElementById('decodeBtn');
const decResult = document.getElementById('decResult');

dropZone.addEventListener('click', ()=> fileInput.click());
dropZone.addEventListener('dragover', e=>{ e.preventDefault(); dropZone.classList.add('drag'); });
dropZone.addEventListener('dragleave', ()=> dropZone.classList.remove('drag'));
dropZone.addEventListener('drop', e=>{
  e.preventDefault();
  dropZone.classList.remove('drag');
  if(e.dataTransfer.files.length) loadImage(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', ()=>{
  if(fileInput.files.length) loadImage(fileInput.files[0]);
});

function loadImage(file){
  if(!file.type.startsWith('image/')){
    alert('Please choose an image file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = e=>{
    imgPreview.src = e.target.result;
    imgPreviewWrap.style.display = 'block';
    decodeBtn.disabled = false;
    decResult.classList.remove('show');
  };
  reader.readAsDataURL(file);
}

decodeBtn.addEventListener('click', async ()=>{
  decodeBtn.disabled = true;
  decodeBtn.textContent = 'Decoding…';
  decResult.classList.remove('show','err');

  try{
    if(typeof ZXing === 'undefined'){
      throw new Error('Decoder library failed to load. Check your connection and try again.');
    }
    const hints = new Map();
    hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
    const reader = new ZXing.BrowserMultiFormatReader(hints);
    const result = await reader.decodeFromImageElement(imgPreview);

    const text = result.getText();
    const format = result.getBarcodeFormat ? ZXing.BarcodeFormat[result.getBarcodeFormat()] : 'code';

    document.getElementById('decFormat').textContent = format;
    document.getElementById('decText').textContent = text;
    decResult.classList.add('show');

    const openBtn = document.getElementById('openLinkBtn');
    if(/^https?:\/\//i.test(text)){
      openBtn.style.display = 'inline-block';
      openBtn.href = text;
    } else {
      openBtn.style.display = 'none';
    }
  }catch(err){
    document.getElementById('decFormat').textContent = 'no match';
    document.getElementById('decText').textContent = 'No QR code or barcode could be found in this image. Try a clearer or closer photo.';
    document.getElementById('openLinkBtn').style.display = 'none';
    decResult.classList.add('show','err');
  }finally{
    decodeBtn.disabled = false;
    decodeBtn.textContent = 'Decode image';
  }
});

document.getElementById('copyBtn').addEventListener('click', ()=>{
  const text = document.getElementById('decText').textContent;
  navigator.clipboard.writeText(text).then(()=>{
    const btn = document.getElementById('copyBtn');
    const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(()=> btn.textContent = old, 1200);
  });
});
