

const API_URL = '../backend/server.php?resource=subjects';

// Función para crear el modal/pop-up con la tabla de materias
export function initSubjectsModal() {
  // Crear el contenedor modal solo si no existe aún
  if (document.getElementById('subjectsModal')) return;

  const modal = document.createElement('div');
  modal.id = 'subjectsModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.display = 'none'; // oculto por defecto
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '9999';

  // Contenido del modal
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.minWidth = '300px';
  modalContent.style.maxWidth = '600px';
  modalContent.style.maxHeight = '80vh';
  modalContent.style.overflowY = 'auto';

  // Botón cerrar
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Cerrar';
  closeBtn.classList.add('w3-button', 'w3-red', 'w3-margin-bottom','w3-margin-top');
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Título
  const title = document.createElement('h3');
  title.textContent = 'Materias del estudiante';

  // Tabla donde se mostrarán las materias
  const table = document.createElement('table');
  table.classList.add('w3-table-all', 'w3-hoverable');

  // Encabezado
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr class="w3-light-blue">
      <th>Materia</th>
      <th>Nota</th>
    </tr>
  `;
  table.appendChild(thead);

  // Cuerpo de la tabla
  const tbody = document.createElement('tbody');
  tbody.id = 'subjectsTableBody';
  table.appendChild(tbody);

  modalContent.appendChild(title);
  modalContent.appendChild(table);
  modal.appendChild(modalContent);
  modalContent.appendChild(closeBtn);

  document.body.appendChild(modal);
}

// Función para abrir el modal y cargar las materias de un estudiante
export async function mostrarMaterias(studentId) {
  // Asegurarse de que el modal está creado
  initSubjectsModal();

  const modal = document.getElementById('subjectsModal');
  const tbody = document.getElementById('subjectsTableBody');

  // Limpiar tabla antes de cargar datos nuevos
  tbody.replaceChildren();

  try {API_URL
    // Cambia la URL de la API según tu backend para obtener materias de un estudiante
    const response = await fetch(`../backend/server.php?resource=subjects&id=${studentId}`);
    //const response = await fetch(`API_URL&studentId=${studentId}`);

    const subjects = await response.json();

    if (subjects.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 2;
      td.textContent = 'No tiene materias asignadas.';
      tr.appendChild(td);
      tbody.appendChild(tr);
    } else {
      subjects.forEach(({ name, grade }) => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.textContent = name;
        const tdGrade = document.createElement('td');
        tdGrade.textContent = grade ?? '-';
        tr.appendChild(tdName);
        tr.appendChild(tdGrade);
        tbody.appendChild(tr);
      });
    }

    // Mostrar modal
    modal.style.display = 'flex';
  } catch (error) {
    alert(error.message);
  }
}
