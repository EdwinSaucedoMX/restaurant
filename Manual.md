# Restaurant

## Colecciones

### `menu_items`

---

Esta colección guarda la información de los platillos y bebidas que vende el restaurant.

Tiene dos variaciones.

#### Platillos sin variaciones

**Campos**

Opcionales *

| Nombre           | Tipo                      | Descripción                                                  |
| ---------------- | ------------------------- | ------------------------------------------------------------ |
| `name`           | Cadena                    | Nombre del platillo.                                         |
| `description` *  | Cadena                    | Descripción del platillo.                                    |
| `image`          | Cadena                    | Nombre del archivo donde se encuentra la imagen del platillo. |
| `price`          | Flotante                  | Precio del platillo.                                         |
| `category`       | Cadena                    | Categoría: Entradas, Postres, Bebidas, etc.                  |
| `ingredients` *  | Arreglo de cadenas        | Lista de los ingredientes opcionales del platillo.           |
| `season_start` * | Fecha                     | Fecha en que el platillo comenzará a estar disponible. Si el campo no existe, el platillo siempre está disponible. |
| `season_end` *   | Fecha                     | Fecha en que el platillo dejará de estar disponible. Si el campo no existe, el platillo siempre está disponible. |
| `subsidiary` *   | ObjectId a `subsidiaries` | Si el platillo sólo pertenece a una sucursal, aquí dice a cuál. Si el campo no existe entonces el platillo es global. |

#### Platillos con variaciones

Son platillos que pueden tener variaciones, por ejemplo, de tamaño, tipo, etc. Por ejemplo, podemos tener un platillo *Pizza*, el cuál puede tener las presentaciones *Individual*, *Mediana* y *Grande*, cada una con un precio diferente. Entonces podemos tener un sólo documento, y agregar una variación para cada tamaño. Así nos evitamos tener varios documentos con información repetida.

Tiene los mismos campos que un platillo sin variaciones. El campo `price` pasa a ser opcional. Además, incorpora el campo `variations`:

| Nombre       | Tipo                  | Descripción                                                |
| ------------ | --------------------- | ---------------------------------------------------------- |
| `variations` | Arreglo de documentos | Información de cada una de las variaciones de un platillo. |

**Campos de `variations`**

| Nombre          | Tipo               | Descripción                                                  |
| --------------- | ------------------ | ------------------------------------------------------------ |
| `name`          | Cadena             | Nombre de la variante.                                       |
| `price`         | Flotante           | Precio de la variante.                                       |
| `description` * | Cadena             | Descripción de la variante.                                  |
| `ingredients` * | Arreglo de cadenas | Ingredientes opcionales propios de esta variante. Los ingredientes que se presentan en todas las variantes se deberían poner en el primer documento. |

#### ¿Cómo elegir cuál usar?

Un platillo puede variar de muchas formas. Este proyecto está pensado para que sea lo más flexible posible y se pueda usar en cualquier tipo de restaurant. Aquí hay algunas ideas sobre cuando usar cada tipo de documento.

- Si el platillo tiene varios sabores, y todos cuestan lo mismo. Entonces es mejor usar un platillo **sin variaciones**, y agregar cada sabor como un ingrediente. Un ejemplo puede ser una paletería, en la que todas las paletas cuestan lo mismo
- Si el platillo tiene varios sabores, pero el precio varía entre uno y otro. Entonces hay que usar el platillo **con variaciones** y agregar cada sabor como una variación, para así poder ponerle un precio distinto a cada uno. Un ejemplo puede ser una taquería, donde los tacos de barbacoa cuestan más que los demás.
- Si el platillo tiene varios ingredientes opcionales, y cuesta dinero extra agregar ingredientes extra. Se puede usar un platillo **con variaciones**, y agregar en el precio, cuánto cuesta extra usar ese ingrediente. Un ejemplo puede ser una hamburguesa, a la cuál se le puede agregar queso extra por \$15, tocino extra por \$20, etc.
- Si el platillo tiene variaciones y todas ellas sólo serán vendidas durante una misma temporada. Se puede usar un platillo **con variaciones**. Al finalizar la temporada, el platillo y todas sus variaciones serán ocultadas.
- Si sólo una variación del platillo tiene temporada, se debe agregar esta variación como un platillo aparte, usando un platillo **sin variaciones**. Así, al terminar la temporada, sólo este platillo será ocultado.

### `bills`

---

En esta colección se guardan todas las cuentas de lo que se ha vendido en el restaurant.

**Campos**

Opcionales *

| Nombre          | Tipo                       | Descripción                                                  |
| --------------- | -------------------------- | ------------------------------------------------------------ |
| `date`          | Fecha                      | Fecha y hora en que se creó la cuenta.                       |
| `reservation` * | Object id a `reservations` | Si había una reservación, se puede usar para saber a quién pertenecía. |
| `waiter`        | Object id a `employees`    | Id del mesero que atendió a esta mesa.                       |
| `total`         | Flotante                   | Total de la venta.                                           |
| `tip`           | Flotante                   | Propina que se dejó al mesero.                               |
| `table`         | Entero                     | Número de mesa.                                              |
| `subsidiary`    | Object id a `subsidiaries` | Id de la sucursal donde sucedió la venta.                    |

### `subsidiaries`

---

Información de las sucursales del restaurant.

**Campos**

Opcionales *

| Nombre    | Tipo                    | Descripción                               |
| --------- | ----------------------- | ----------------------------------------- |
| `name`    | Cadena                  | Nombre de la sucursal.                    |
| `address` | Documento embebido      | Dirección de la sucursal.                 |
| `contact` | Documento embebido      | Información de contacto de la sucursal.   |
| `manager` | Object id a `employees` | Id del empleado encargado de la sucursal. |

**Campos de `address`**

| Nombre              | Tipo   | Descripción     |
| ------------------- | ------ | --------------- |
| `street`            | Cadena | Calle           |
| `number`            | Cadena | Número exterior |
| `interior_number` * | Cadena | Número interior |
| `city`              | Cadena | Ciudad          |
| `state`             | Cadena | Estado          |
| `country`           | Cadena | País            |
| `postal_code`       | Cadena | Número postal   |

**Campos de `contact`**

| Nombre        | Tipo   | Descripción         |
| ------------- | ------ | ------------------- |
| `phone`       | Cadena | Número de teléfono  |
| `email`       | Cadena | Correo electrónico  |
| `facebook` *  | Cadena | Cuenta de Facebook  |
| `instagram` * | Cadena | Cuenta de Instagram |
| `twitter` *   | Cadena | Cuenta de Twitter   |

### `employees`

Aquí se guarda la información de todos los empleados del restaurant.

**Campos**

| Nombre            | Tipo                       | Descripción                                                  |
| ----------------- | -------------------------- | ------------------------------------------------------------ |
| `name`            | Cadena                     | Nombre del empleado.                                         |
| `hiring_date`     | Fecha                      | Fecha de contratación.                                       |
| `position`        | Cadena                     | Posición del empleado: Gerente, Mesero, Cocinero, etc.       |
| `degree`          | Cadena                     | Nivel de estudios del empleado.                              |
| `phone`           | Cadena                     | Número de teléfono.                                          |
| `email`           | Cadena                     | Correo electrónico que el empleado usa para iniciar sesión en el sistema. |
| `password`        | Cadena                     | Contraseña encriptada del empleado.                          |
| `is_active`       | Booleano                   | Estatus actual del empleado. Ya que las cuentas hacen referencia a los empleados, estos no se pueden eliminar. Por lo que si un empleado ya no se encuentra trabajando, aquí se marca como `false`. |
| `subsidiary`      | Object id a `subsidiaries` | Id de la sucursal donde trabaja el empleado.                 |
| `schedule`        | Documento embebido         | Información del horario de trabajo del empleado.             |
| `salary`          | Flotante                   | Salario del empleado.                                        |
| `legal_documents` | Arreglo de cadenas         | Direcciones de los archivos almacenados en el servidor.      |
| `permissions`     | Object id a `permissions`  | Id de la tabla de permisos del empleado.                     |

**Campos de `schedule`**

Tiene 7 documentos embebidos, cada uno con el nombre de un día de la semana. `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`. Dentro de cada uno de estos documentos se encuentra:

| Nombre  | Tipo  | Descripción                                                  |
| ------- | ----- | ------------------------------------------------------------ |
| `start` | Fecha | Hora de entrada del empleado. La fecha siempre es 1 de Enero del 2000, para facilitar el manejo. |
| `end`   | Fecha | Fecha de salida del empleado. La fecha siempre es 1 de Enero del 2000, para facilitar el manejo. |

### `reservations`

Aquí se guardan todas las reservaciones que se hacen al restaurant.

**Campos**

| Nombre       | Tipo                       | Descripción                                     |
| ------------ | -------------------------- | ----------------------------------------------- |
| `client`     | Cadena                     | Nombre del cliente.                             |
| `phone`      | Cadena                     | Número de teléfono del cliente.                 |
| `subsidiary` | Object id a `subsidiaries` | Id de la sucursal donde se hizo la reservación. |
| `table`      | Entero                     | Mesa a reservar.                                |
| `date`       | Fecha                      | Fecha y hora de la reservación.                 |

### `permissions`

Cada empleado puede tener su propia tabla de permisos. También se le puede asignar una misma tabla a varios empleados, pero hay que tener cuidado, ya que al actualizarla, se actualizarán los permisos para todos los empleados.

**Campos**

| Nombre                            | Tipo     | Descripción                                                  |
| --------------------------------- | -------- | ------------------------------------------------------------ |
| `name`                            | Booleano | Nombre de la tabla de permisos.                              |
| `add_subsidiaries`                | Booleano | Agregar una sucursal.                                        |
| `remove_subsidiaries`             | Booleano | Eliminar una sucursal.                                       |
| `update_any_subsidiary`           | Booleano | Actualizar información de cualquier sucursal.                |
| `add_subsidiary_manager`          | Booleano | Agregar un empleado como gerente de sucursal.                |
| `remove_subsidiary_manager`       | Booleano | Eliminar permisos de gerente a un empleado.                  |
| `update_subsidiary_manager`       | Booleano | Actualizar el gerente de una sucursal.                       |
| `add_any_subsidiary_menu_item`    | Booleano | Agregar un platillo global.                                  |
| `remove_any_subsidiary_menu_item` | Booleano | Eliminar un platillo global.                                 |
| `update_any_subsidiary_menu_item` | Booleano | Actualizar un platillo global.                               |
| `update_subsidiary_info`          | Booleano | Actualizar cualquier información de la sucursal.             |
| `update_subsidiary_contact_info`  | Booleano | Actualizar información de contacto de la sucursal.           |
| `add_menu_item`                   | Booleano | Agregar un platillo a la sucursal.                           |
| `remove_menu_item`                | Booleano | Eliminar un platillo  de la sucursal. Si el platillo es global, no se puede eliminar. |
| `update_menu_item`                | Booleano | Actualizar un platillo de la sucursal. Si el platillo es global, no se puede modificar. |
| `add_check`                       | Booleano | Agregar una cuenta de la sucursal.                           |
| `remove_check`                    | Booleano | Eliminar una cuenta de la sucursal.                          |
| `update_check`                    | Booleano | Actualizar la información de una cuenta de la sucursal.      |
| `add_reservation`                 | Booleano | Agregar una reservación de la sucursal.                      |
| `remove_reservation`              | Booleano | Eliminar una reservación de la sucursal.                     |
| `update_reservation`              | Booleano | Actualizar información de una reservación de la sucursal.    |

#### Permisos sugeridos

**Administrador general**

- Agregar sucursales
- Eliminar sucursales
- Actualizar información de cualquier sucursal
- Agregar, eliminar y modificar administradores de sucursal
- Agregar, eliminar y modificar información de cualquier empleado
- Agregar, eliminar y modificar platillos

**Administrador de sucursal**

- Actualizar información de su sucursal, excepto su administrador

**Ayudante de administrador de sucursal**

- Actualizar los datos de contacto de la sucursal
- Agregar, eliminar y modificar platillos de la sucursal
- Modificar y eliminar cuentas

**Recepcionista**

- Agregar, eliminar y modificar reservaciones

**Mesero / Cajero**

- Hacer cuentas

## Consultas

### Platillos y bebidas

1. Listar todos los platillos de una sola categoría en todas las sucursales, (Sólo el administrador general puede usarlo).

   ````json
   db.menu_items.find({
       $and: [
           // Reemplazar CATEGORIA por la categoría a listar
           {"category": "CATEGORIA"},
           {
               // Si el documento no tiene el campo 'season_start'
               // o lo tiene, y entra en el rango de fechas
               $or: [
                   {
                       "season_start": {$exists: false}
                   },
                   {
                       $and: [
                           {"season_start": {$lte: new Date()}},
                           {"season_end": {$gte: new Date()}}
                       ]
                   }
               ]
           }
       ]
   })
   ````

2. Buscar un platillo por nombre en todas las sucursales, (Sólo el administrador general puede usarlo).

   ````json
   db.menu_items.find({
       // Reemplazar CADENA por el nombre del platillo a buscar
       "name": {
           $regex: 'CADENA*',
           $options: 'i'
       }
   })
   ````

3. Listar todos los platillos de una sola categoría en una sucursal.

   ````json
   db.menu_items.find({
       $and: [
           // Reemplazar CATEGORIA por la categoría a listar
           {"category": "CATEGORIA"},
           {
               // Si el documento no tiene el campo 'season_start'
               // o lo tiene, y entra en el rango de fechas
               $or: [
                   {
                       "season_start": {$exists: false}
                   },
                   {
                       $and: [
                           {"season_start": {$lte: new Date()}},
                           {"season_end": {$gte: new Date()}}
                       ]
                   }
               ]
           },
           {
               // Si el documento no tiene el campo 'subsidiary'
               // entonces es global.
               // O lo tiene y coincide con el id de la sucursal
               $or: [
                   {
                       "subsidiary": {$exists: false}
                   },
                   {
                       // Reemplazar ID_SUCURSAL por
                       // el id de la sucursal
                       // de la que queremos listar
                       "subsidiary": ObjectId("ID_SUCURSAL")
                   }
               ]
           }
       ]
   })
   ````

4. Buscar un platillo por nombre en una sucursal.

   ````json
   db.menu_items.find({
       $and: [
           {
               // Si el documento no tiene el campo 'subsidiary'
               // entonces es global.
               // O lo tiene y coincide con el id de la sucursal
               $or: [
                   {
                       "subsidiary": {$exists: false}
                   },
                   {
                       // Reemplazar ID_SUCURSAL por
                       // el id de la sucursal
                       // de la que queremos listar
                       "subsidiary": ObjectId("ID_SUCURSAL")
                   }
               ]
           },
           {
               // Reemplazar CADENA por el nombre del platillo a buscar
   			"name": {
   				$regex: "CADENA*",
   				$options: "i",
   			}
           }
       ]
   })
   ````


### Cuentas

1. Listar todas las cuentas por fecha.

   ````json
   db.bills.find().sort({date: -1})
   ````

2. Listar todas las cuentas de un mesero por id.

   ````json
   db.bills.find({"waiter": ObjectId("ID_EMPLEADO")})).sort({date: -1})
   ````

3. Listar todas las cuentas de un mesero por nombre.

   Primero se busca el mesero con:

   ````json
   db.employees.find({
       position: "Mesero",
         name: {
           $regex: "NOMBRE*",
           $options: 'i'
         }
   })
   ````

   El usuario hace clic en el mesero y se obtiene su id.

4. Listar los 5 platillos más comprados.

   ````json
   db.bills.aggregate{[
     {
       // Ocultar los campos que no vamos a usar
       $project: {
         _id: 0,
         date: 0,
         reservation: 0,
         waiter: 0,
         total: 0,
         tip: 0,
         table: 0,
         subsidiary: 0,
       },
     },
     {
       // Expandir el arreglo de 'orders' el cual contiene
       // los ids de los platillos que se compraron en esa cuenta
       $unwind: {
         path: "$orders",
         preserveNullAndEmptyArrays: false,
       },
     },
     {
       // Contar cuantas veces se repite cada id
       $group: {
         _id: "$orders",
         count: { $sum: 1 },
       },
     },
     {
       // Ordenar de mayor a menor
       $sort: {
         count: -1,
       },
     },
     {
       // Dejar sólo los primeros 5
       $limit: 5,
     },
     {
       // Obtener la información de los platillos
       $lookup: {
         from: "menu_items",
         localField: "_id",
         foreignField: "_id",
         as: "top_info",
       },
     },
     {
       // Ocultar los datos que no se usan
       $project: {
         _id: 0,
         count: 0,
       },
     },
     {
       // Expandir el arreglo resultante
       $unwind: {
         path: "$top_info",
         preserveNullAndEmptyArrays: false,
       },
     },
   ]}
   ````

5. Listar todas las cuentas de una sucursal por id.

   ````json
   db.bills.find({"subsidiary": ObjectId("ID")}).sort({date: -1})
   ````

6. Listar todas las cuentas de una sucursal por nombre.

   Primero se busca la sucursal con:

   ````json
   db.subsidiaries.find({
       name: {
           $regex: "NOMBRE*",
   		$options: 'i'
   	}
   })
   ````

   El usuario hace clic en la sucursal y se obtiene su id.

### Sucursales

1. Listar todas las sucursales

   ````json
   db.subsidiaries.find()
   ````

2. Buscar sucursales por ubicación

   ````json
   db.subsidiaries.find({
       "address.country": {
           $regex: "PAIS*",
           $options: 'i'
       },
       "address.state": {
           $regex: "ESTADO*",
           $options: 'i'
       },
       "address.city": {
           $regex: "CIUDAD*",
           $options: 'i'
       },
   })
   ````

### Empleados

1. Listar todos los empleados. (Sólo lo puede usar el administrador).

   Ordenar:

   - Por nombre

     ````json
     db.employees.find().sort({name: 1})
     ````

   - Por fecha de contratación

     ````json
     db.employees.find().sort({hiring_date: -1})
     ````

2. Listar todos los empleados activos/inactivos. (Sólo lo puede usar el administrador).

   ````json
   db.employees.find({is_active: BOOL}).sort({name: 1})
   ````

3. Buscar empleado por nombre (admin).

   ````json
   db.employees.find({
       name:{
           $regex: "NOMBRE*",
           $options: 'i'
       }
   })
   ````

4. Buscar empleado por correo (admin).

   ````json
   db.employees.find({
       email: {
           $regex: "CORREO*",
           $options: 'i'
       }
   })
   ````

5. Listar todos los empleados de una sucursal.

   Ordenar:

   - Por nombre

     ````json
     db.employees.find({
         subsidiary: ObjectId("ID_SUCURSAL")
     }).sort({name: 1})
     ````

   - Por fecha de contratación

     ````json
     db.employees.find({
         subsidiary: ObjectId("ID_SUCURSAL")
     }).sort({date: -1})
     ````

6. Listar todos los empleados activos/inactivos de una sucursal.

   ````json
   db.employees.find({
       subsidiary: ObjectId("ID_SUCURSAL"),
       is_active: BOOL
   }).sort({name: 1})
   ````

7. Buscar empleado por nombre en una sucursal.

   ````json
   db.employees.find({
       subsidiary: ObjectId("ID_SUCURSAL"),
       name:{
           $regex: "NOMBRE*",
           $options: 'i'
       }
   })
   ````

8. Buscar empleado por correo en una sucursal.

   ````json
   db.employees.find({
       subsidiary: ObjectId("ID_SUCURSAL"),
       email: {
           $regex: "CORREO*",
           $options: 'i'
       }
   })
   ````

9. Mostrar el mesero que más vendió en el mes en una sucursal.

   ````json
   db.bills.aggregate([
     {
       // Seleccionar a todas las cuentas de una sucursal
       $match: {
         subsidiary: ObjectId("ID_SUCURSAL"),
       },
     },
     {
       // Obtener el año y mes actual
       // Y el año y mes de cada cuenta
       $project: {
         year: { $year: "$date" },
         current_year: { $year: new Date() },
   
         month: { $month: "$date" },
         current_month: { $month: new Date() },
         waiter: 1,
       },
     },
     {
       // Seleccionar todos los documentos
       // Cuyo año y mes coinciden con los actuales
       $match: {
         $expr: {
           $and: [
             {
               $eq: ["$month", "$current_month"],
             },
             {
               $eq: ["$year", "$current_year"],
             },
           ],
         },
       },
     },
     {
       // Calcular cuántas cuentas hizo cada empleado
       $group: {
         _id: "$waiter",
         total_bills: {
           $sum: 1,
         },
       },
     },
     {
       // Ordenar a los empleados de mayor a menor
       // por el total de cuentas
       $sort: {
         total_bills: -1,
       },
     },
     {
       // Seleccionar sólo al primer empleado
       $limit: 1,
     },
     {
       // Obtener la información del empleado
       $lookup: {
         from: "employees",
         localField: "_id",
         foreignField: "_id",
         as: "best_waiter",
       },
     },
     {
       // Expandir información
       $unwind: {
         path: "$best_waiter",
       },
     },
   ])
   ````

### Reservaciones

1. Listar las reservaciones actuales (ordenar por fecha).

   ````json
   db.reservations.find({
       "date": {$gte: new Date()}
   }).sort({"date": 1})
   ````

2. Buscar reservaciones actuales por nombre.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$gte: new Date()}},
           {"client": {
               $regex: "NOMBRE*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": 1})
   ````

3. Buscar reservaciones actuales por teléfono.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$gte: new Date()}},
           {"phone": {
               $regex: "TELÉFONO*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": 1})
   ````

4. Listar las reservaciones pasadas.

   ````json
   db.reservations.find({
       "date": {$lt: new Date()}
   }).sort({"date": -1})
   ````

5. Buscar reservaciones pasadas por nombre.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$lt: new Date()}},
           {"client": {
               $regex: "NOMBRE*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": -1})
   ````

6. Buscar reservaciones pasadas por teléfono.

   ````json
   db.reservations.find({
       $and: [
           {"date": {$lt: new Date()}},
           {"phone": {
               $regex: "TELÉFONO*",
               $options: 'i'
           }}
       ]    
   }).sort({"date": -1})
   ````

7. Buscar todas las reservaciones por nombre.

   ````json
   db.reservations.find({
       "client": {
           $regex: "NOMBRE*",
           $options: 'i'
       }
   }).sort({"date": -1})
   ````

8. Buscar todas las reservaciones por teléfono.

   ````json
   db.reservations.find({
      	"phone": {
           $regex: "TELÉFONO*",
           $options: 'i'
       }
   }).sort({"date": -1})
   ````

### Permisos

1. Buscar permisos por nombre.

   ````json
   db.permissions.find({
      	"name": {
           $regex: "NOMBRE*",
           $options: 'i'
       }
   }
   ````

