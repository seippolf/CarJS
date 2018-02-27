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
    var tm = document.getElementById('manTemperature').value;
    var ve = document.getElementById('volEfficiency').value;
    var n = document.getElementById('engineSpeed').value;
    var vd = document.getElementById('volDisplacement').value;
    var tempSelect = document.getElementById('tempUnit').value;
    if(tempSelect == 'celsius') {
        tm = (tm * 1.8) + 32;
    }
    var volSelect = document.getElementById().value;
    var mp = (wa * r * (460 + tm)) / (ve * (n/2) * vd)
    if(ve <= 0 || n <= 0 || vd <= 0) {
        alert("Less than zero... this is impossible.");
        document.getElementById('mapReq').innerHTML = "Manifold Pressure Requirements: NaN";
    }
    else {
        document.getElementById('mapReq').innerHTML = "Manifold Pressure Requirements: " + mp; 
    }
}