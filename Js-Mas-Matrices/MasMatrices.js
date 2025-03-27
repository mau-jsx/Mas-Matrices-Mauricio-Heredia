import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function Preguntar(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}
async function Agregar_o_Modificar(estudiantes, nombre, materia, nota) {
    for (const estudiante of estudiantes) {
        if (estudiante[0] === nombre) {
            for (const calificacion of estudiante[1]) {
                if (calificacion[0] === materia) {
                    const opcion = await Preguntar(`${nombre} ya tiene una nota en ${materia}. ¿Deseas modificarla? (s/n): `);
                    if (opcion.toLowerCase() === 's') {
                        calificacion[1] = nota;
                        console.log(`Nota modificada: ${nombre} ahora tiene ${nota} en ${materia}.`);
                    }
                    return;
                }
            }
            estudiante[1].push([materia, nota]);
            console.log(`Nueva materia agregada: ${nombre} ahora tiene ${materia} con nota ${nota}.`);
            return;
        }
    }
    estudiantes.push([nombre, [[materia, nota]]]);
    console.log(`Nuevo estudiante agregado: ${nombre} con ${materia} (${nota}).`);
}


function Mostrar_Alumnos(estudiantes) {
    console.log("\n📋 Lista de Estudiantes:");
    for (const estudiante of estudiantes) {
        console.log(`${estudiante[0]}:`);
        for (const calificacion of estudiante[1]) {
            console.log(`  ${calificacion[0]}: ${calificacion[1]}`);
        }
    }
}

async function main() {
    const estudiantes = [
        ['Juan', [['Matematicas', 8], ['Lengua', 9], ['Sociales', 7], ['Naturales', 7]]],
        ['Ana', [['Lengua', 9], ['Matematicas', 10], ['Sociales', 8], ['Naturales', 6]]],
        ['Luis', [['Lengua', 6], ['Sociales', 8], ['Matematicas', 7], ['Naturales', 6]]],
        ['María', [['Lengua', 9], ['Sociales', 10], ['Naturales', 10], ['Matematicas', 9]]]
    ];

    let continuar = true;

    while (continuar) {
        console.log("\nOpciones: \n1. Agregar/Modificar calificación \n2. Mostrar calificaciones \n3. Salir");
        const opcion = await Preguntar("Elige una opción: ");

        if (opcion === '1') {
            const nombre = await Preguntar('Nombre del estudiante: ');
            const materia = await Preguntar('Nombre de la materia: ');
            const nota = parseFloat(await Preguntar('Ingrese la nota (0-10): '));

            if (!isNaN(nota) && nota >= 0 && nota <= 10) {
                await Agregar_o_Modificar(estudiantes, nombre, materia, nota);
            } else {
                console.log("⚠️ La nota debe ser un número entre 0 y 10.");
            }
        } else if (opcion === '2') {
            Mostrar_Alumnos(estudiantes);
        } else if (opcion === '3') {
            continuar = false;
        } else {
            console.log("Opción no válida. Inténtalo de nuevo.");
        }
    }
    rl.close();
}

main();
