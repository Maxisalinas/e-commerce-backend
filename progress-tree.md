## MODULO 1: Product, Category
- ✅ Implementación de la arquitectura basada en principios de Clean Architecture y DDD (entidades, casos de uso, repositorios, controladores, middlewares). 
- ✅ Configuración y validación de variables de entornos (archivo .env) 
- ✅ Creación de entidades: Product y Category (relación por FK). 
- ✅ Definición e implementación del flujo completo CRUD para ambas entidades. 
- ✅ Validaciones de entrada y salida. 
- ✅ Implementación de paginado en endpoints de listado. 
- ✅ Centralización y manejo de errores. 
- ✅ Implementación del patrón repositorio con ORM. 
- ✅ Primera migración hacia la base de datos local. 

## MODULO 2: User, Role & auth.
- ✅ Creación de entidades: User y Role (relación por FK). 
- ✅ Definición e implementación del flujo completo CRUD para User. 
- ✅ Validaciones de entrada y salida. 
- ✅ Authentication & Authorization: 
    - Register, Login, Logout 
    - Manejo y validación de tokens (access_token & refresh_token). 
    - Verificación de roles de usuario.
    - Protección de rutas con middlewares para operaciones específicas. 
    - Errores personalizados.
- ✅Adaptadores para dependencias externas: 
    - Encriptación de passwords. 
    - Hasheo y verificación de tokens.
- ✅ Segunda migración hacia la base de datos local. 

## MODULO 3: Cart
- ✅ Creación de entidades: Cart y CartItem con relaciones adecuadas.
- ✅ Implementación de operaciones y casos de uso tipicos de Cart:
    - Obtener carrito.
    - Limpiar Carrito
    - Añadir items, evitando duplicados y consultando stock.
    - Actualizar cantidad del producto seleccionado.
    - Remover item.
    - Persisitr carrito post login.
- ✅ Validaciones de entrada y salida.
- ✅ Centralizar la inicialización de la app.
- ✅ Migrar a la base de datos.


## MODULO 4: Order
- ⏳
- ⏳
- ⏳


## MODULO 5: Discounts
- ⏳
- ⏳
- ⏳

## MODULO 6: Shipping
- ⏳
- ⏳
- ⏳

## MODULO 7: payment-processing
- ⏳
- ⏳
- ⏳




// commit

feat(order): implementar módulo de órdenes (Order)
- Crear entidades Order y OrderItem con relaciones correspondientes
- Implementar flujo CRUD completo para Order
- Agregar validaciones de entrada para la creación de ordenes
- Añadir reglas de negocio:
    - Validación de existencia de items en el carrito antes de crear una orden
    - Validación de estados válidos para la orden y cambio de estado
    - Lógica para el cálculo de totales incluyendo descuentos y costos de envío
- Implementar errores personalizados de dominio:
    - InvalidOrderStatusError, OrderAlreadyCancelledError, CartEmptyError
- Ejecutar migración para la base de datos, creando las tablas de Orders, OrderItems, ShippingMethod y Payment
