# js-habits (FreeHabits)

Proyecto del curso de **Programación Orientada a Objetos (POO) en JavaScript**. La idea es construir un _Habit Tracker_ (rastreador de hábitos) aplicando conceptos de POO como:

- Encapsulamiento (campos privados con `#`)
- Herencia (`TimedHabit` extiende `Habit`)
- Polimorfismo (sobrescritura de métodos como `toDisplayString()`)
- Responsabilidad única (clases separadas para cálculo de rachas y tracking de logs)

La app corre en el navegador y permite:

- Crear hasta **5 hábitos**
- Registrar y remover _check-ins_ por día
- Calcular rachas (_streaks_)
  - Diarias (`daily`)
  - Semanales (`weekly`)

---

## Demo / Vista general

La interfaz principal está en `src/index.html` y carga el script `src/app.js`.

- **Tablero mensual**: muestra los días del mes (hasta el día actual) y permite marcar/desmarcar check-ins.
- **Modales**:
  - Crear hábito
  - Registrar hábito

---

## Estructura del proyecto

```txt
.
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── examples.js
├── package.json
└── README.md
```

- `src/index.html`: maquetado principal.
- `src/styles.css`: estilos.
- `src/app.js`: lógica completa (dominio + UI).
- `examples.js`: ejemplos sencillos usados en el curso (funciones y objetos literales).

---

## Requisitos

- Node.js (recomendado **18+**) solo si quieres usar un servidor local.
- Un navegador moderno (para soportar **campos privados** `#privateField`).

---

## Cómo ejecutar

### Opción A: abrir el HTML directamente

1. Abre `src/index.html` en tu navegador.

> Nota: dependiendo del navegador, abrir archivos con `file://` puede tener limitaciones. Si algo no carga como esperas, usa un servidor local (Opción B).

### Opción B: servidor local (recomendado)

Si tienes alguna extensión como **Live Server** en VS Code, úsala apuntando a `src/index.html`.

Alternativas:

- Con Node (si tienes `npx` disponible):
  - `npx serve src`

---

## Conceptos de POO aplicados (lo importante del curso)

### 1) Modelo de dominio

El dominio principal vive en `src/app.js` y está compuesto por:

- `Habit`
  - Representa un hábito base.
  - Encapsula estado con campos privados:
    - `#name`, `#frequency`, `#id`, `#tracker`, `#createdAt`
  - Expone comportamiento:
    - `rename()`
    - `registerCheckIn(date)`
    - `getLogs()` / `removeCheckIn(date)`
    - `calculateStreak(today)`

- `TimedHabit extends Habit`
  - Agrega el concepto de **objetivo de tiempo** en minutos (`#targetMinutes`).
  - Sobrescribe `toDisplayString()` para extender el formato.

### 2) Encapsulamiento y validaciones

- El `name` se normaliza con `trim()` y valida mínimo 3 caracteres.
- La `frequency` valida valores permitidos: `daily` o `weekly`.

### 3) Manejo de errores de dominio

- `DomainError` extiende `Error` y agrega un `code`.
- `ERROR_CODES` centraliza los códigos de error (ej. `INVALID_NAME`, `INVALID_FREQUENCY`).

### 4) Tracking de check-ins

- `LogTracker`
  - Guarda internamente un arreglo privado `#dates`.
  - Permite:
    - `addLog(date)`
    - `getLogs()`
    - `removeLog(date)`

### 5) Cálculo de rachas (Strategy)

El cálculo de rachas se delega a calculadoras según la frecuencia:

- `DailyStreakCalculator`
- `WeeklyStreakCalculator`

Y se seleccionan desde:

- `STREK_CALCULATORS` (mapa por frecuencia)

Esto permite cambiar/crecer la lógica de rachas sin modificar el core del hábito, aplicando un enfoque tipo **Strategy**.

---

## Reglas de negocio principales

- Máximo **5 hábitos** (`MAX_HABITS`).
- El tablero mensual muestra desde el día 1 hasta el día actual del mes.
- Al hacer click en una celda del tablero:
  - Si está marcada: se elimina el log.
  - Si no está marcada: se registra el check-in.

---

## Datos de ejemplo

Al iniciar la app (`initApp()`), se crean hábitos de demo en consola:

- Un hábito diario `Leer` con check-ins
- Un hábito semanal `Ejercicio` con check-ins
- Un hábito con tiempo `Meditar`

Esto sirve para probar:

- `toDisplayString()`
- `calculateStreak()`

---

## Notas y mejoras sugeridas (para practicar)

- Persistencia en `localStorage` para no perder hábitos al recargar.
- Validación de fechas (evitar fechas futuras y duplicados por día).
- Sección de estadísticas usando `getStatistics()`:
  - Total de hábitos
  - Total de check-ins
  - Hábito más constante
- Separar dominio y UI en módulos (ej. `domain/` y `ui/`).

---

## Licencia

MIT.
