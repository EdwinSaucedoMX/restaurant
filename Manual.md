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



