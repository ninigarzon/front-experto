// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [detailsOptions, setDetailsOptions] = useState([]);
  
  useEffect(() => {
    // Fetch service types
    axios.get('http://127.0.0.1/service-type')
      .then(response => {
        setServiceTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching service types:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch menu options if a service is selected
    if (selectedService) {
      axios.get('http://127.0.0.1/main-menu')
        .then(response => {
          setMenuOptions(response.data);
        })
        .catch(error => {
          console.error('Error fetching menu options:', error);
        });
    }
  }, [selectedService]);

  useEffect(() => {
    // Fetch details options if a menu option is selected
    if (selectedMenu) {
      axios.get('http://127.0.0.1/details')
        .then(response => {
          setDetailsOptions(response.data);
        })
        .catch(error => {
          console.error('Error fetching details options:', error);
        });
    }
  }, [selectedMenu]);

  return (
    <div>
      <h1>Seleccione un servicio:</h1>
        <select onChange={e => setSelectedService(e.target.value)}>
        <option value="">Seleccionar...</option>
        {serviceTypes.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      
      {selectedService && (
        <div>
          <h2>Seleccione un menú:</h2>
          <select onChange={e => setSelectedMenu(e.target.value)}>
            <option value="">Seleccionar...</option>
            {selectedMenu.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedMenu && (
        <div>
          <h3>Seleccione un detalle:</h3>
          <select>
            <option value="">Seleccionar...</option>
            {detailsOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
