// src/surveys/PadelSurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';

const PadelSurvey = () => {
  const [formData, setFormData] = useState({
    eta: '',
    rapportoSport: [],
    sportCollegheColleghi: [],
    competenze: '',
    certificazioni: '',
    community: '',
    teamOrganizzativo: '',
    nomeCognome: '',
    email: '',
    cellulare: '',
    nome: "",
    cognome: "",

    competenzeSportive: '',
    specificaCompetenze: '',
  });

  const navigate = useNavigate();

  const [showCompetenze, setShowCompetenze] = useState(false);

  const handleCompetenzeChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, competenzeSportive: value });
    setShowCompetenze(value === 'Si'); // Mostra la domanda aggiuntiva solo se seleziona "Si"
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Se l'input è un checkbox, aggiorna correttamente l'array
    if (type === 'checkbox' && name === 'sportCollegheColleghi') {
        const updatedSport = checked
            ? [...formData.sportCollegheColleghi, value] // Aggiungi sport se selezionato
            : formData.sportCollegheColleghi.filter((sport) => sport !== value); // Rimuovi sport se deselezionato

        setFormData({ ...formData, sportCollegheColleghi: updatedSport });
    } else {
        // Aggiorna il campo di testo "Altro" o altri campi normali
        setFormData({ ...formData, [name]: value });
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const { nome, cognome, email, cellulare, sportCollegheColleghi, altroSport } = formData;

  // Verifica che tutti i campi obbligatori siano riempiti e almeno uno sport sia selezionato o il campo "Altro" sia riempito
  if (!nome || !cognome || !email || !cellulare || (sportCollegheColleghi.length === 0 && !altroSport)) {
      alert("Per favore, compila tutti i campi obbligatori e seleziona almeno un'attività sportiva o inserisci un'altra attività sportiva.");
      return;
  }

  console.log('Submitting form data:', formData); // Aggiunto per debug

  try {
      const collectionRef = collection(db, 'Subscribe');
      await addDoc(collectionRef, formData);
      navigate('/thank-you');
  } catch (error) {
      console.error('Error submitting survey: ', error.message); // Log dell'errore
      alert(`Error submitting survey. Details: ${error.message}`); // Alert dettagliato
  }
};




  return (
    <div className="survey-container">
      <h1>Benvenuti in SPORT NETWORK</h1>
      <p>Compilando la seguente survey ci aiuterai a individuare le tue passioni sportive e creare un network tra colleghi e colleghe con cui condividerle.</p>
      <p>Insieme possiamo creare un ambiente più sano, coeso e stimolante!</p>
      <p>Grazie per il vostro impegno e la vostra partecipazione!</p>
      <p>INFORMATIVA PRIVACY</p>
      <p>Grazie per il tuo contributo, purtroppo avendo negato il consenso al trattamento dei tuoi dati non è possibile procedere con la compilazione del questionario.
        Per qualunque dubbio puoi contattarci a <a href="mailto:sportnetwork_cc@leonardo.com">sportnetwork_cc@leonardo.com</a>
      </p>
      <form onSubmit={handleSubmit} className="survey-form">
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cognome" placeholder="Cognome" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="cellulare" placeholder="Cellulare" onChange={handleChange} required />
        <fieldset>
          <legend>Qual è la tua fascia d’età?</legend>
          <label><input type="radio" name="eta" value="Sotto i 25 anni" onChange={handleChange} /> Sotto i 25 anni</label>
          <label><input type="radio" name="eta" value="25-35" onChange={handleChange} /> 25-35</label>
          <label><input type="radio" name="eta" value="35-45" onChange={handleChange} /> 35-45</label>
          <label><input type="radio" name="eta" value="45 in poi" onChange={handleChange} /> 45 in poi</label>
        </fieldset>
        <fieldset>
          <legend>Qual è il tuo attuale rapporto con lo Sport?</legend>
          <label><input type="checkbox" name="rapportoSport" value="Pratico a livello agonistico" onChange={handleChange} /> Pratico a livello agonistico</label>
          <label><input type="checkbox" name="rapportoSport" value="Pratico molto attivamente" onChange={handleChange} /> Pratico molto attivamente</label>
          <label><input type="checkbox" name="rapportoSport" value="Pratico almeno una volta a settimana" onChange={handleChange} /> Pratico almeno una volta a settimana</label>
          <label><input type="checkbox" name="rapportoSport" value="Pratico saltuariamente" onChange={handleChange} /> Pratico saltuariamente</label>
          <label><input type="checkbox" name="rapportoSport" value="Non pratico attività sportiva" onChange={handleChange} /> Non pratico attività sportiva</label>
        </fieldset>
        <fieldset>
          <legend>Quali sport pratichi già e a che livello?</legend>
          <input type="text" name="sport1" placeholder="SPORT 1" onChange={handleChange} />
          <select name="livelloSport1" onChange={handleChange}>
            <option value="">Seleziona Livello</option>
            <option value="Principiante">Principiante</option>
            <option value="Medio">Medio</option>
            <option value="Avanzato">Avanzato</option>
          </select>
          <br></br>
          <input type="text" name="sport2" placeholder="SPORT 2" onChange={handleChange} />
          <select name="livelloSport2" onChange={handleChange}>
            <option value="">Seleziona Livello</option>
            <option value="Principiante">Principiante</option>
            <option value="Medio">Medio</option>
            <option value="Avanzato">Avanzato</option>
          </select>

          <input type="text" name="sport3" placeholder="SPORT 3" onChange={handleChange} />
          <select name="livelloSport3" onChange={handleChange}>
            <option value="">Seleziona Livello</option>
            <option value="Principiante">Principiante</option>
            <option value="Medio">Medio</option>
            <option value="Avanzato">Avanzato</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Che attività sportiva ti piacerebbe fare con altri colleghi?</legend>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Acquafitness" onChange={handleChange} /> Acquafitness</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Beach volley" onChange={handleChange} /> Beach volley</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Calcetto" onChange={handleChange} /> Calcetto</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Ciclismo" onChange={handleChange} /> Ciclismo</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Corsa" onChange={handleChange} /> Corsa</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Padel" onChange={handleChange} /> Padel</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Sci/Snowboard" onChange={handleChange} /> Sci/Snowboard</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Trekking" onChange={handleChange} /> Trekking</label>
          <label><input type="checkbox" name="sportCollegheColleghi" value="Yoga/Pilates" onChange={handleChange} /> Yoga/Pilates</label>
          <input
            type="text"
            name="altroSport"
            placeholder="Inserisci un altro sport"
            value={formData.altroSport || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <legend>Hai delle competenze sportive che vorresti mettere a disposizione per guidare tecnicamente un gruppo di colleghi e colleghe?</legend>
          <label>
            <input
              type="radio"
              name="competenzeSportive"
              value="Si"
              onChange={handleCompetenzeChange}
            />{' '}
            Sì
          </label>
          <label>
            <input
              type="radio"
              name="competenzeSportive"
              value="No"
              onChange={handleCompetenzeChange}
            />{' '}
            No
          </label>
        </fieldset>

        {showCompetenze && (
          <div>
            <fieldset>
              <legend>
                Per favore specifica che tipo di competenze sportive vorresti mettere a disposizione e se hai certificazioni o abilitazioni come istruttore
              </legend>
              <input
                type="text"
                name="specificaCompetenze"
                placeholder="Descrivi le tue competenze sportive"
                onChange={handleChange}
              />
              <input
                type="text"
                name="certificazioni"
                placeholder="Scrivi eventuali certificazioni o abilitazioni"
                onChange={handleChange}
              />
            </fieldset>
          </div>
        )}

        <fieldset>
          <legend>Ti piacerebbe entrare nel team organizzativo di Sport Network come
            coordinatore di una specifica attività sportiva (Sport Champion)?
          </legend>
          <label><input type="radio" name="teamOrganizzativo" value="Si" onChange={handleChange} /> Si</label>
          <label><input type="radio" name="teamOrganizzativo" value="No" onChange={handleChange} /> No</label>
        </fieldset>

        <p>Grazie per aver completato il sondaggio. Le tue risposte ci aiuteranno a pianificare al meglio il nostro Sport Network. Se hai ulteriori idee o suggerimenti non esitare a condividerli e contattaci a <a href="mailto:sportnetwork_cc@leonardo.com">sportnetwork_cc@leonardo.com</a></p>

        <button type="submit">Invia</button>
      </form>
      <div className="powered-by">Powered by T&I - AI Department</div>
    </div>
  );
};

export default PadelSurvey;
