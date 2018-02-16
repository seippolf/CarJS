function airflowActual() {
    var hp = document.getElementById('hpTarget').value;
    var af = document.getElementById('afRatio').value;
    var bsfc = document.getElementById('bsFuelConsumption').value; 
    var wa = hp * af * (bsfc/60);
    alert(wa);
}
