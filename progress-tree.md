## MODULO 1: Product, Category
- ✅ Implementación de la arquitectura basada en principios de Clean Architecture y DDD (entidades, casos de uso, repositorios, controladores, middlewares). 
- ✅ Configuración y validación de variables de entornos (archivo .env) 
- ✅ Creación de entidades: Product y Category (relación por FK). 
- ✅ Definición e implementación del flujo completo CRUD para ambas entidades. 
- ✅ Validaciones de entrada y salida. 
- ✅ Implementación de paginado en endpoints de listado. 
- ✅ Centralización y manejo de errores. 
- ✅ Implementación del patrón repositorio con ORM. 
- ✅ Migración hacia la base de datos,  creando las tablas Product y Category.


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
- ✅ Migración hacia la base de datos, creando las tablas User y Role.


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
- ✅ Centralización de la inicialización de la app.
- ✅ Migración hacia la base de datos, creando las tablas Cart y CartItem.


## MODULO 4: Order
- ✅ Creación de entidades: Order y OrderItem con relaciones correspondientes.
- ✅ Implementación del flujo completo CRUD para Order
- ✅ Validaciones de entrada al crear órdenes:
    - Asegurar que el carrito no esté vacío.
    - Validar estados válidos para la orden y cambios de estado.
- ✅ Reglas de negocio implementadas:
    - Cálculo de totales incluyendo descuentos y costos de envío.
- ✅ Manejo de errores personalizados:
    - InvalidOrderStatusError
    - OrderAlreadyCancelledError
    - CartEmptyError
- ✅ Migración hacia la base de datos, creando tablas Order, OrderItem, ShippingMethod, Payment.


## MODULO 5: Checkout
- ✅ Implementación del caso de uso Checkout como orquestador de:
    - Cart
    - Order
    - Discounts
    - Payment
    - Shipping
- ✅ Implementación del flujo completo CRUD para ShippingMethod.
- ✅ Validaciones de entrada al crear métodos de envío.
- ✅ Creación de la entidad Shipping.
- ✅ Integración del cálculo de costo de envío:
    - Reglas de negocio:
        - Precio base del método de envío.
        - Peso total de los productos.
        - Cantidad de ítems.
        - Distancia estimada.
    - Adaptadores para servicios internos y externos.
- ✅ Implementación de mappers para transformar objetos de dominio ↔ infraestructura (persistencia).
- ✅ Migración hacia la base de datos, creando la tabla de Shipping.


## MODULO 6: payment-processing
- ⏳
- ⏳
- ⏳


## MODULO 7: Discounts
- ⏳
- ⏳
- ⏳


## MODULO 8: Shipping
- ⏳
- ⏳
- ⏳