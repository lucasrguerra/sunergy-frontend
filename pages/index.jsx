import Header from '../components/Header';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { data } from 'autoprefixer';

export default function IndexPage() {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [consumedWattsPerMonth, setConsumedWattsPerMonth] = useState('');

  const [Data, setData] = useState('');

  async function getDataOfRegionWithAdress() {
    let bodyFormData = new FormData();
    bodyFormData.append('street', street);
    bodyFormData.append('number', number);
    bodyFormData.append('district', district);
    bodyFormData.append('city', city);
    bodyFormData.append('consumedWattsPerMonth', consumedWattsPerMonth);
    
    const dataOfRegion = await axios({
      method: "post",
      url: `https://sunergy.mybluemix.net/api/getDataWithAdress`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      return response.data;
    });

    console.log(dataOfRegion);

    setData(
      <div className="text-text-left text-lg px-8 md:px-36 md:text-xl lg:px-48 xl:px-96 lg:text-2xl">
        <h4 className="text-xl text-center font-bold md:text-3xl lg:text-4xl">Resultados</h4>
        <br />
        <p>Média de Irradiação Solar: <span className="font-bold">{dataOfRegion.medianOfIrradiationInRegion} h/dia</span></p>
        <br />
        <p>Painel Solar modelo 1 (<span className="font-bold">{dataOfRegion.panelsInfos.panelModel_1.panelPower} Watts</span>)</p>
        <p>Energia gerada pelo painel: <span className="font-bold">{(dataOfRegion.panelsInfos.panelModel_1.wattsPerMonth) / 1000} kWh/mês</span></p>
        <p>Paineis necessário para suprir o seu consumo mensal: <br /><span className="font-bold">{dataOfRegion.panelsInfos.panelModel_1.numberOfPanelsNeeded} Painéis</span></p>
        <br />
        <p>Painel Solar modelo 2 (<span className="font-bold">{dataOfRegion.panelsInfos.panelModel_2.panelPower} Watts</span>)</p>
        <p>Energia gerada pelo painel: <span className="font-bold">{(dataOfRegion.panelsInfos.panelModel_2.wattsPerMonth) / 1000} kWh/mês</span></p>
        <p>Paineis necessário para suprir o seu consumo mensal: <br /><span className="font-bold">{dataOfRegion.panelsInfos.panelModel_2.numberOfPanelsNeeded} Painéis</span></p>
        <br />
        <p>Painel Solar modelo 3 (<span className="font-bold">{dataOfRegion.panelsInfos.panelModel_3.panelPower} Watts</span>)</p>
        <p>Energia gerada pelo painel: <span className="font-bold">{(dataOfRegion.panelsInfos.panelModel_3.wattsPerMonth) / 1000} kWh/mês</span></p>
        <p>Paineis necessário para suprir o seu consumo mensal: <br /><span className="font-bold">{dataOfRegion.panelsInfos.panelModel_3.numberOfPanelsNeeded} Painéis</span></p>
        <br />
        <p>Valor a ser economizado todo mês: <span className="font-bold">R$ {dataOfRegion.valueToSaveInReal}</span></p>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="text-white bg-blue-800 py-8 px-16 md:px-36 lg:px-48 xl:px-96">
        <h3 className="text-xl md:text-2xl text-left">Saiba mais sobre a</h3>
        <h4 className="text-2xl md:text-4xl font-bold text-center">ENERGIA SOLAR</h4>
        <h3 className="text-xl md:text-2xl text-right">onde você mora</h3>
      </div>

      <br /><br />
      <form className="px-12 font-sans font-bold text-lg md:px-36 md:text-xl lg:px-48 xl:px-96 lg:text-2xl">
        <p className="text-center">Preencha as informações abaixo e veja agora as informações sobre a energia solar na sua região</p>
        
        <br />
        <label className="pl-2" htmlFor="street">
          Rua: <br />
          <input className="rounded-lg border-gray-300 border-2 pl-2 w-full"
            type="text"
            placeholder="Rua Irineu de Amorim"
            onChange={(event) => {
              setStreet(event.target.value);
            }}
          />
        </label>
        <br />
        <label className="pl-2" htmlFor="number">
          Número: <br />
          <input className="rounded-lg border-gray-300 border-2 pl-2 w-full"
            type="number"
            placeholder="100"
            onChange={(event) => {
              setNumber(event.target.value);
            }}
          />
        </label>
        <br />
        <label className="pl-2" htmlFor="district">
          Bairro: <br />
          <input className="rounded-lg border-gray-300 border-2 pl-2 w-full"
            type="district"
            placeholder="Derby"
            onChange={(event) => {
              setDistrict(event.target.value);
            }}
          />
        </label>
        <br />
        <label className="pl-2" htmlFor="cidade">
          Cidade: <br />
          <input className="rounded-lg border-gray-300 border-2 pl-2 w-full"
            type="text"
            placeholder="Recife"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </label>
        <br />
        <label className="pl-2" htmlFor="cidade">
          Consumo mensal de energia: (kWh)<br />
          <input className="rounded-lg border-gray-300 border-2 pl-2 w-full"
            type="number"
            placeholder="240"
            onChange={(event) => {
              setConsumedWattsPerMonth(parseInt(event.target.value) * 1000);
            }}
          />
        </label>

        <br /><br />
        <div className="text-center text-xl text-white md:text-2xl">
          <button className="bg-blue-800 px-4 py-2 rounded-full md:py-3 px-4"
            type="submit"
            onClick={async (event) => {
              event.preventDefault();
              await getDataOfRegionWithAdress();
            }}
          >
            Consultar
          </button>
        </div>
      </form>

      <br />
      {Data}
      <br /><br />
    </div>
  );
};