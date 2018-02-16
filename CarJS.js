function airflowActual() {
    var hp = document.getElementById('hpTarget').value;
    var af = document.getElementById('afRatio').value;
    var bsfc = document.getElementById('bsFuelConsumption').value; 
    var wa = hp * af * (bsfc/60);
    document.getElementById('airflowCalc').innerHTML = "Airflowactual: " + wa;
    return wa;
}
function mapRequired() {
    var wa = airflowActual();
    var r = 639.6;
    var tm = 130;
    var ve = 0.98;
    var n = 3300;
    var vd = 400;
    var mp = (wa * r * (460 + tm)) / (ve * (n/2) * vd)
    if(ve <= 0 || n <= 0 || vd <= 0) {
        alert("Less than zero... this is impossible.");
    }
    alert(mp);
}