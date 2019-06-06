import React, {useEffect, useState} from 'react'

function WebSocketTest(action, varFrecuency, varKeepTime, varAmount) {

  if ("WebSocket" in window) {
        let ws = new WebSocket("ws://localhost:6789/");
        ws.onopen = function () {
          ws.send(action.replace("varFrecuency", varFrecuency)
              .replace("varKeepTime", varKeepTime).replace(
              "varAmount", varAmount));
        };
        ws.onmessage = function (event) {
          let response = event.data;
          console.log(response);
        };
        ws.onerror = function (error) {
          console.log('Error de conexión con el Servicio.' + error);
      };
      ws.onclose = function (error) {
          console.log('WebSocket Close: ' + error);
      };
  }
  else {
      alert("WebSocket NOT supported by your Browser!");
  }
    
}

var enumAction = {
    READ_SN: "{'action':'READ_SN'}", ENCRYPT_KEY: "{'action':'ENCRYPT_KEY','param':{'KEY':'D1B1E92DA46272C83ADDAC7EB68E80C159A4AEF877097F50692B3A720689B51860E3480ED3F010797F5DBD04D2FC11D0'} }"
};

export default function Pay(props) {
  const {aerolinea, agencia, credito, signatures, total, plazo} = props
  const [choseOne, setCheck] = useState('tarjeta');
  let sign = []
  Object.keys(signatures).forEach(function(key) {
    sign.push(<option className="labelModal" key={signatures[key].Id_VTC_Solicitud_Tarjeta} value={signatures[key].Id_VTC_Solicitud_Tarjeta}>{signatures[key].Numero_Tarjeta}</option>)
  })
  useEffect(() => {
    if(choseOne==='tarjeta'){
        WebSocketTest(enumAction.READ_SN);
    }
  },[choseOne])//revisa si este valor cambió para volver a renderizar o no

  return (
    <div className="container">
      <div className="info">
        <div className="row colModal">
          <div className="col-md-5">
            <label className="labelModal">Código de establecimiento: </label>
          </div>
          <div className="col-md-7">
            <input type="text" required className="inputModal" name="nombre" value={agencia}  disabled/>
          </div>
        </div>
        <div className="row colModal">
          <div className="col-md-5">
            <label className="labelModal">Aerolínea: </label>
          </div>
          <div className="col-md-7">
            <input type="text" required className="inputModal" value={aerolinea} name="nombre" disabled/>
          </div>
        </div>
        <div className="row colModal">
          <div className="col-md-5">
            <label className="labelModal">Valor de transacción: </label>
          </div>
          <div className="col-md-7">
            <input type="text" required className="inputModal" value={total} name="nombre" disabled/>
          </div>
        </div>
        <div className="row colModal">
          <div className="col-md-5">
            <label className="labelModal">Tipo de crédito: </label>
          </div>
          <div className="col-md-7">
            <input type="text" required className="inputModal" value={credito} name="nombre" disabled/>
          </div>
        </div>
        <div className="row colModal">
          <div className="col-md-5">
            <label className="labelModal">Plazo: </label>
          </div>
          <div className="col-md-7">
            <input type="text" required className="inputModal" value={plazo} name="nombre" disabled/>
          </div>
        </div>
      </div>

      <div className="info checkModal">
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" value="tarjeta" checked={choseOne==='tarjeta'} onChange={(e)=> setCheck(e.target.value)}/>
            <label className="labelModal" htmlFor="inlineRadio1">Lectura de Tarjeta</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" value="signature" checked={choseOne==='signature'} onChange={(e)=> setCheck(e.target.value)}/>
            <label className="labelModal" htmlFor="inlineRadio2">Signature On File</label>
        </div>
      </div>
        
      <div className="tarjeta">
        <div className="row colModal">
            <div className="col-md-2">
                <label className="labelModal">Tarjeta</label>
            </div>
            <div className="col-md-10">
                {
                  (choseOne === 'tarjeta')
                  ?
                    <input type="text" required className="inputModal" name="nombre" />
                  :
                    <select className="inputModal" name="aerolinea">
                        {
                            sign
                        }
                    </select>
                }
            </div>
        </div>
        <div className="row colModal">
            <div className="col-md-2">
                <label className="labelModal">Boletos</label>
            </div>
            <div className="col-md-5">
                <input type="text" required className="inputModal" name="nombre" />
            </div>
            <div className="col-md-5">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>

        <div className="row rowButton">
            <button className="btn btn-primary btnModal">Procesar</button>
        </div>
      </div>
      
      <div className="row rowButton">
            <button className="btn btn-primary btnModal">Grabar</button>
      </div>
        
    </div>
  )
}
 