def agregar_o_modificar_calificacion(estudiantes, nombre, materia, nota):
    for estudiante in estudiantes:
        if estudiante[0] == nombre:
            for materia_existente in estudiante[1]:
                if materia_existente[0] == materia:
                    opcion = input(f"{nombre} ya tiene una nota en {materia}. ¿Deseas modificarla? (s/n): ")
                    if opcion.lower() == 's':
                        materia_existente[1] = nota
                    return
            estudiante[1].append([materia, nota])
            return
    
    estudiantes.append([nombre, [[materia, nota]]])

def mostrar_estudiantes(estudiantes):
    for estudiante in estudiantes:
        print(f"{estudiante[0]}:")
        for materia, nota in estudiante[1]:
            print(f"  {materia}: {nota}")

def main():
    estudiantes = [
        ['Juan' , [['Matematicas', 8], ['Lengua', 9], ['Sociales', 7], ['Naturales', 7]]],
        ['Ana'  , [['Lengua', 9], ['Matematicas', 10], ['Sociales', 8], ['Naturales', 6]]],
        ['Luis' , [['Lengua', 6], ['Sociales', 8], ['Matematicas', 7], ['Naturales', 6]]],
        ['María', [['Lengua', 9], ['Sociales', 10], ['Naturales', 10], ['Matematicas', 9]]]
    ]
    
    while True:
        print("\nOpciones: \n1. Agregar/Modificar calificación \n2. Mostrar calificaciones \n3. Salir")
        opcion = input("Elige una opción: ")
        
        if opcion == '1':
            nombre = input("Nombre del estudiante: ")
            materia = input("Nombre de la materia: ")
            nota = int(input("Nota: "))
            agregar_o_modificar_calificacion(estudiantes, nombre, materia, nota)
        elif opcion == '2':
            mostrar_estudiantes(estudiantes)
        elif opcion == '3':
            break
        else:
            print("Opción no válida. Inténtalo de nuevo.")

if __name__ == "__main__":
    main()