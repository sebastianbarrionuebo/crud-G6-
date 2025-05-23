//frontDispatcher_2.0
import { initSubjectsModal, mostrarMaterias } from './studentSubjects.js';
//const API_URL = '../backend/server.php/students';
const API_URL = '../backend/server.php?resource=students';

document.addEventListener('DOMContentLoaded', () => 
{
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const studentIdInput = document.getElementById('studentId');
    ///Modal de materias
    ///const subjectsModalController = initSubjectsModal('subjectsModal', 'closeSubjectsModal', 'subjectsContent');

    // Leer todos los estudiantes al cargar
    fetchStudents();

    // Formulario: Crear o actualizar estudiante
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            fullname: fullnameInput.value,
            email: emailInput.value,
            age: ageInput.value,
        };

        const id = studentIdInput.value;
        const method = id ? 'PUT' : 'POST';
        if (id) formData.id = id;

        try 
        {
            const response = await fetch(API_URL, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                studentForm.reset();
                studentIdInput.value = '';
                await fetchStudents();
            } else {
                alert("Error al guardar");
            }
        } catch (err) {
            console.error(err);
        }
    });

    // Obtener estudiantes y renderizar tabla
    async function fetchStudents() 
    {
        try 
        {
            const res = await fetch(API_URL);
            const students = await res.json();

            //Limpiar tabla de forma segura.
            studentTableBody.replaceChildren();
            //acá innerHTML es seguro a XSS porque no hay entrada de usuario
            //igual no lo uso.
            //studentTableBody.innerHTML = "";

            
            students.forEach(student => {
                const tr = document.createElement('tr');

                const tdName = document.createElement('td');
                tdName.textContent = student.fullname;

                const tdEmail = document.createElement('td');
                tdEmail.textContent = student.email;

                const tdAge = document.createElement('td');
                tdAge.textContent = student.age;

                const tdActions = document.createElement('td');

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Editar';
                editBtn.classList.add('w3-button', 'w3-blue', 'w3-small', 'w3-margin-right');
                editBtn.onclick = () => {
                    fullnameInput.value = student.fullname;
                    emailInput.value = student.email;
                    ageInput.value = student.age;
                    studentIdInput.value = student.id;
                };

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Borrar';
                deleteBtn.classList.add('w3-button', 'w3-red', 'w3-small', 'w3-margin-right');
                deleteBtn.onclick = () => deleteStudent(student.id);
                
                const subjectsBtn = document.createElement('button');
                subjectsBtn.textContent = 'Materias';
                subjectsBtn.classList.add('w3-button', 'w3-yellow', 'w3-small', 'w3-margin-right');
                subjectsBtn.onclick = () => {
                    mostrarMaterias(student.id);
                    studentIdInput.value = studentId;

                }

                tdActions.appendChild(editBtn);
                tdActions.appendChild(deleteBtn);
                tdActions.appendChild(subjectsBtn);

                tr.appendChild(tdName);
                tr.appendChild(tdEmail);
                tr.appendChild(tdAge);
                tr.appendChild(tdActions);

                studentTableBody.appendChild(tr);
            });
        } catch (err) {
            console.error("Error al obtener estudiantes:", err);
        }
    }

    // Eliminar estudiante
    async function deleteStudent(id) 
    {
        if (!confirm("¿Seguro que querés borrar este estudiante?")) return;

        try 
        {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                await fetchStudents();
            } else {
                alert("Error al borrar");
            }
        } catch (err) {
            console.error(err);
        }
    }
});
