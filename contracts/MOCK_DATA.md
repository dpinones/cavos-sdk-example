# Mock Data para Fernet Barato App

Los tests han creado datos de prueba realistas que puedes usar para desarrollar y probar el frontend de la aplicación.

## 🏪 Tiendas Creadas (Store IDs 1-5)

### Store ID: 1 - Carrefour Villa Crespo
- **Nombre**: Carrefour Villa Crespo
- **Dirección**: Av. Corrientes 4817, Villa Crespo, CABA
- **Teléfono**: +54 11 4857-3200
- **Horarios**: Lun-Dom: 8:00-22:00
- **URI**: https://www.carrefour.com.ar/tiendas/villa-crespo
- **Precio Actual**: $1,890.00 (18900 centavos)

### Store ID: 2 - Disco Palermo
- **Nombre**: Disco Palermo
- **Dirección**: Av. Santa Fe 3253, Palermo, CABA
- **Teléfono**: +54 11 4831-9500
- **Horarios**: Lun-Sab: 8:00-24:00, Dom: 9:00-22:00
- **URI**: https://www.disco.com.ar/tienda/palermo
- **Precio Actual**: $2,050.00 (20500 centavos)
- **Reportes**: 1 reporte de precio incorrecto

### Store ID: 3 - Coto Belgrano
- **Nombre**: Coto Belgrano
- **Dirección**: Av. Cabildo 2602, Belgrano, CABA
- **Teléfono**: +54 11 4781-4500
- **Horarios**: Lun-Dom: 8:30-21:30
- **URI**: https://www.coto.com.ar/sucursales/belgrano
- **Precio Actual**: $1,840.00 (18400 centavos)
- **Agradecimientos**: 1 thanks

### Store ID: 4 - Jumbo Unicenter
- **Nombre**: Jumbo Unicenter
- **Dirección**: Parana 3745, Martinez, Buenos Aires
- **Teléfono**: +54 11 4837-8000
- **Horarios**: Lun-Dom: 8:00-22:00
- **URI**: https://www.jumbo.com.ar/tienda/unicenter
- **Precio Actual**: $1,750.00 (17500 centavos) ⭐ **MEJOR PRECIO**
- **Agradecimientos**: 2 thanks (más popular)

### Store ID: 5 - La Anonima Recoleta
- **Nombre**: La Anonima Recoleta
- **Dirección**: Av. Las Heras 2100, Recoleta, CABA
- **Teléfono**: +54 11 4801-2300
- **Horarios**: Lun-Sab: 7:30-24:00, Dom: 8:00-23:00
- **URI**: https://www.laanonimaonline.com.ar/recoleta
- **Precio Actual**: $1,810.00 (18100 centavos)

## 💰 Historial de Precios

Cada tienda tiene 2 entradas de precios:

### Enero 2024 (Timestamp: 1705334400)
- Carrefour: $1,800.00
- Disco: $1,950.00
- Coto: $1,750.00
- Jumbo: $1,650.00
- La Anonima: $1,720.00

### Febrero 2024 (Timestamp: 1708012800) - Precios actuales
- Carrefour: $1,890.00 (+$90)
- Disco: $2,050.00 (+$100)
- Coto: $1,840.00 (+$90)
- Jumbo: $1,750.00 (+$100)
- La Anonima: $1,810.00 (+$90)

## 👤 Usuarios de Prueba

### USER1 (Address: 'user1')
- ✅ Agradeció a Jumbo (Store ID: 4)
- 📝 Reportó precio incorrecto en Disco (Store ID: 2)

### USER2 (Address: 'user2') 
- ✅ Agradeció a Jumbo (Store ID: 4)
- ✅ Agradeció a Coto (Store ID: 3)

## 🎯 Datos para Testing Frontend

### Ranking por Precio (Menor a Mayor)
1. **Jumbo**: $1,750.00 (2 thanks) ⭐
2. **La Anonima**: $1,810.00
3. **Coto**: $1,840.00 (1 thanks)
4. **Carrefour**: $1,890.00
5. **Disco**: $2,050.00 (1 reporte)

### Casos de Uso para Probar

1. **Lista de Precios**: Mostrar todas las tiendas ordenadas por precio
2. **Detalles de Tienda**: Mostrar información completa de cualquier tienda
3. **Historial**: Ver evolución de precios en el tiempo
4. **Sistema de Thanks**: Mostrar popularidad y permitir agradecer
5. **Reportes**: Mostrar que Disco tiene un reporte
6. **Búsqueda**: Buscar por nombre de tienda

### Funciones de Contrato Disponibles

```cairo
// Obtener todas las tiendas
get_all_stores() -> Array<Store>

// Obtener todos los precios actuales  
get_all_current_prices() -> Array<(felt252, Price)>

// Obtener tienda específica
get_store(store_id: felt252) -> Store

// Obtener precio actual
get_current_price(store_id: felt252) -> Price

// Obtener historial de precios
get_price_history(store_id: felt252) -> Array<Price>

// Sistema de agradecimientos
get_thanks_count(store_id: felt252) -> u64
has_user_thanked(store_id: felt252, user: ContractAddress) -> bool
give_thanks(store_id: felt252)

// Sistema de reportes
get_reports(store_id: felt252) -> Array<Report>
submit_report(store_id: felt252, description: ByteArray)
```

## 🚀 Cómo Ejecutar los Tests

```bash
cd contracts
scarb test
```

Los tests crean automáticamente todos estos datos y verifican que funcionan correctamente.

## 📱 Sugerencias para el Frontend

1. **Pantalla Principal**: Lista de tiendas ordenada por precio
2. **Detalle de Tienda**: Toda la info + botón de "thanks" + historial
3. **Mapa**: Usar las direcciones para mostrar ubicaciones
4. **Filtros**: Por precio, por distancia, por popularidad (thanks)
5. **Reportes**: Formulario simple para reportar problemas

¡Los datos están listos para que empieces a desarrollar el frontend! 🎉