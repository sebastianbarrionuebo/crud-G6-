
//const API_URL = '../backend/server.php?resource=studentSubject';
const API_URL = '../backend/server.php';

// Funcion para crear el modal/pop-up con la tabla de materias
export function initSubjectsModal() {
  // Crear el contenedor modal solo si no existe aun
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

  //Contenido del modal
  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '8px';
  modalContent.style.minWidth = '300px';
  modalContent.style.maxWidth = '600px';
  modalContent.style.maxHeight = '80vh';
  modalContent.style.overflowY = 'auto';



  //Formulario para asignar una materia con nota al estudiante
  const form = document.createElement('form');
  // Campo oculto para el ID del estudiante
  const studentIdInput = document.createElement('input');
  studentIdInput.type = 'hidden';
  studentIdInput.name = 'studentId';

  // Campo para nombre de materia
  const subjectInput = document.createElement('input');
  subjectInput.type = 'text';
  subjectInput.placeholder = 'Materia';
  subjectInput.name = 'subject';
  const subjectSelect = document.createElement('select');
  subjectSelect.name = 'subject';
  subjectSelect.required = true;
  subjectSelect.classList.add('w3-select', 'w3-margin-bottom');



  // Campo para nota
  const gradeInput = document.createElement('input');
  gradeInput.type = 'number';
  gradeInput.placeholder = 'Nota';
  gradeInput.name = 'grade';
  gradeInput.required = true;
  gradeInput.min = 0;
  gradeInput.max = 10;
  gradeInput.step = 0.1;
  gradeInput.classList.add('w3-input', 'w3-margin-bottom');

  // Botón de envío
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Agregar Materia';
  submitBtn.classList.add('w3-button', 'w3-blue', 'w3-margin-bottom');

  form.appendChild(studentIdInput);
  form.appendChild(subjectSelect);
  form.appendChild(gradeInput);
  form.appendChild(submitBtn);


  // Titulo
  const title = document.createElement('h3');
  title.textContent = 'Materias del estudiante';

  // Tabla donde se mostraran las materias
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

  // Boton cerrar
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Cerrar';
  closeBtn.classList.add('w3-button', 'w3-red', 'w3-margin-bottom','w3-margin-top');
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Cuerpo de la tabla
  const tbody = document.createElement('tbody');
  tbody.id = 'subjectsTableBody';
  table.appendChild(tbody);

  modalContent.appendChild(title);
  modalContent.appendChild(form);
  modalContent.appendChild(table);
  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);




  // Al enviar el formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const subject_id = subjectSelect.value;
    const grade = parseFloat(gradeInput.value);
    const student_id = studentIdInput.value;

    console.log(subject_id);
    console.log(grade);
    console.log(student_id);
    
    try {
      const response = await fetch(`${API_URL}?resource=studentSubject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id, subject_id, grade })
      });

      const result = await response.json();

      if (response.ok) {
        // Recargar materias después de agregar
        mostrarMaterias(student_id);
      } else {
        alert(result.error || "Error al agregar la materia.");
      }
    } catch (error) {
      alert("Error de red: " + error.message);
    }
  });



}






// Función para abrir el modal y cargar las materias de un estudiante
export async function mostrarMaterias(studentId) {
  // Asegurarse de que el modal está creado
  initSubjectsModal();

  const modal = document.getElementById('subjectsModal');
  const tbody = document.getElementById('subjectsTableBody');

  // Limpiar tabla antes de cargar datos nuevos
  tbody.replaceChildren();

  try {
    //const response = await fetch(`../backend/server.php?resource=subjects&id=${studentId}`);
    const response = await fetch(`${API_URL}?resource=studentSubject&id=${studentId}`);
    const responseSubj = await fetch(`${API_URL}?resource=subjects`);
    //const response = await fetch(`API_URL&studentId=${studentId}`);

    const subjects = await response.json();
    const availableSubjects = await responseSubj.json();

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

    // Llenar el dropdown de materias en el formulario
    const subjectSelect = modal.querySelector('select[name="subject"]');
    if (subjectSelect) {
      // Limpiar opciones previas
      subjectSelect.replaceChildren();

      // Opción por defecto
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      defaultOption.textContent = '-- Seleccione una materia --';
      subjectSelect.appendChild(defaultOption);

      // Agregar opciones desde la base de datos
      availableSubjects.forEach((subject) => {
        const option = document.createElement('option');
        option.value = subject.id;  // O usa `subject.name` si no usás IDs
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
      });
    }

    // Asignar el studentId oculto en el formulario
    const studentIdInput = modal.querySelector('input[name="studentId"]');
    if (studentIdInput) {
      studentIdInput.value = studentId;
    }

    // Mostrar modal
    modal.style.display = 'flex';
  } catch (error) {
    alert(error.message);
  }


}




