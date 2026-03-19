import { mysqlTable, serial, varchar, text, int, bigint, date, mysqlEnum } from "drizzle-orm/mysql-core";

export const users = mysqlTable("usuarios", {
  id: varchar("usuario", { length: 255 }).primaryKey(),
  password: varchar("pass", { length: 255 }).notNull(),
  level: mysqlEnum("nivel", ["X", "C", "A"]).notNull(),
});

// Table: clientes
export const clients = mysqlTable("clientes", {
  id: varchar("identidad_clientes", { length: 255 }).primaryKey(),
  folderNumber: varchar("carpeta", { length: 255 }),
  identityType: varchar("tipo_iden", { length: 255 }),
  firstNames: varchar("nombres", { length: 255 }),
  lastNames: varchar("apellidos", { length: 255 }),
  addressRes: varchar("direccion_res", { length: 255 }),
  phone1: varchar("telefono_1", { length: 255 }),
  phoneRes: varchar("telefono_res", { length: 255 }),
  phone2: varchar("telefono_2", { length: 255 }),
  phone3: varchar("telefono_3", { length: 255 }),
  cityRes: varchar("ciudad_res", { length: 255 }),
  addressOfi: varchar("direccion_ofi", { length: 255 }),
  email: varchar("email", { length: 255 }),
  group: varchar("grupo", { length: 255 }),
  gender: varchar("genero", { length: 255 }),
  birthDate: varchar("fecha_nac", { length: 255 }), // "dia/mes/año"
  pensionType: varchar("tipo_pension", { length: 255 }),
  pensionIdentityType: varchar("tipo_iden_pen", { length: 255 }),
  pensionIdentity: int("identidad_pen").default(0),
  pensionName: varchar("nombre_pen", { length: 255 }),
  recognitionDate: varchar("fecha_rec", { length: 255 }),
  initialPension: int("mesada").default(0),
  retroactive: int("retroactivo").default(0),
  deathDate: varchar("fecha_falle", { length: 255 }),
  pensionEntity: varchar("pen_empresa", { length: 255 }),
  pensionIss: varchar("pen_iss", { length: 255 }),
  salary: varchar("salario", { length: 255 }),
  weeks: varchar("semanas", { length: 255 }),
});

// Table: abogados
export const lawyers = mysqlTable("abogados", {
  id: int("identidad_abogados").primaryKey(),
  firstNames: varchar("nombres", { length: 255 }),
  lastNames: varchar("apellidos", { length: 255 }),
  barCard: varchar("tarjeta_pro", { length: 255 }),
  cityRes: varchar("ciudad_res", { length: 255 }),
  addressRes: varchar("direccion_res", { length: 255 }),
  phone1: varchar("telefono_1", { length: 255 }),
  phone2: varchar("telefono_2", { length: 255 }),
  phoneRes: varchar("telefono_res", { length: 255 }),
  phoneOfi: varchar("telefono_ofi", { length: 255 }),
  email: varchar("email", { length: 255 }),
  website: varchar("sitio_web", { length: 255 }),
});

// Table: archivo_carpetas (The main folder/pensioner record)
export const folders = mysqlTable("archivo_carpetas", {
  folderNumber: varchar("NUN_CARPETA", { length: 255 }),
  folderNumber2: varchar("NUN_CARPETA_2", { length: 255 }),
  clientId: varchar("CEDULA", { length: 255 }).primaryKey(),
  lastNames: varchar("APELLIDOS", { length: 255 }),
  firstNames: varchar("NOMBRES", { length: 255 }),
  birthDate: varchar("FECHA_NACIMIENTO", { length: 255 }),
  addressRes: varchar("DIRECCION_RESIDENCIA", { length: 255 }),
  jurisdiction: varchar("JURIS_DICCION", { length: 255 }),
  district: varchar("PRE", { length: 255 }), // Distrito
  group: varchar("GRUPO", { length: 255 }),
  group2: varchar("GRUPO_2", { length: 255 }),
  gender: varchar("GENERO", { length: 10 }),
  phoneActual: varchar("TELEFONO_ACTUALIZADO", { length: 255 }),
  phoneFixed: varchar("TELEFONO", { length: 255 }),
  email: varchar("EMAIL", { length: 255 }),
  association: varchar("ASOCIACION", { length: 255 }),
  condition: varchar("CONDICION", { length: 255 }), // TITULAR / SUSTITUTO
  type: varchar("TIPO", { length: 255 }), // COMPARTIDA / CONVENCIONAL etc
  recognitionAct: varchar("ACTO_JUBILACION", { length: 255 }),
  startDatePension: varchar("FECHA_A_PARTIR_PENSION_JUBILACION", { length: 255 }),
  entryDateCompany: varchar("FECHA_INGRESO_EMPRESA", { length: 255 }),
  exitDateCompany: varchar("FECHA_EGRESO_EMPRESA", { length: 255 }),
  recognitionDateJubilation: varchar("FECHA_RECONOCIMIENTO_JUBILACION", { length: 255 }),
  ageAtJubilation: varchar("EDAD_A_FECHA_JUBILALCION", { length: 255 }),
  initialMesadaJubilation: varchar("MESADA_INICIAL_DE_LA_JUBILACION", { length: 255 }),
  resColpensiones: varchar("RES_COLPENSIONES_ISS", { length: 255 }),
  initialDateIss: varchar("FECHA_PENSION_INICIAL_ISS", { length: 255 }),
  initialMesadaIss: varchar("VALOR_PENSION_INICIAL_ISS", { length: 255 }),
  resDate: varchar("FECHA_RESOLUCION", { length: 255 }),
  totalWeeks: varchar("TOTAL_SEMANAS", { length: 255 }),
  replacementRate: varchar("TASA_REEMP_APLICADA", { length: 255 }),
  compartitionDate: varchar("FECHA_COMPARTICION", { length: 255 }),
  valueBeforeCompartition: varchar("VALOR_ANTES_COMPARTICION", { length: 255 }),
  retroactiveSuspense: varchar("RETROACTIVO_SUSPENSO", { length: 255 }),
  descompartibilidadDate: varchar("FECHA_DESCOMPARTIBILIDAD", { length: 255 }),
  valueAtChargeOfCompany: varchar("VALOR_A_CARGO_DE_LA_EMPRESA", { length: 255 }),
  valueVejezIss: varchar("VALOR_PENSION_VEJEZ_ISS", { length: 255 }),
  creationDate: varchar("FECHA_CREACION", { length: 255 }),
  deceasedId: varchar("CEDULA_FALLECIDO", { length: 255 }),
  deceasedName: varchar("NOMBRE_FALLECIDO", { length: 255 }),
  deceasedResIss: varchar("RES_COLPENSIONES_ISS_FINADO", { length: 255 }),
  deceasedResDate: varchar("FECHA_RESOLUCION_FINADO", { length: 255 }),
});

// Table: grupo_familiar
export const familyGroups = mysqlTable("grupo_familiar", {
  clientId: varchar("IDENTIDAD_COTIZANTE", { length: 255 }),
  memberId: varchar("IDENTIDAD_AFILIADO", { length: 255 }).primaryKey(),
  firstNames: varchar("NOMBRES_AFILIADO", { length: 255 }),
  type: varchar("AFILIADO_TIPO_COTIZANTE", { length: 255 }),
  birthDate: varchar("FECHA_NACIMIENTO", { length: 255 }),
  relationship: varchar("PARESTESCO", { length: 255 }), // Typo preserved for DB compatibility
  address: varchar("DIRECCION_RESIDENCIA", { length: 255 }),
  phone: varchar("TELEFONO_RESIDENCIA", { length: 255 }),
  city: varchar("MUNICIPIO_RESIDENCIA", { length: 255 }),
});

// Table: tareas
export const tasks = mysqlTable("tareas", {
  id: serial("auto").primaryKey(),
  title: varchar("titulo", { length: 255 }),
  description: text("descripcion"),
  date: varchar("fecha", { length: 12 }),
  hour: varchar("hora", { length: 10 }),
  status: varchar("estado", { length: 20 }),
  userId: varchar("usuario", { length: 255 }),
});

// Table: procesos
export const processes = mysqlTable("procesos", {
  id: serial("num_registro").primaryKey(),
  creationDate: varchar("fecha_creacion", { length: 30 }).notNull(),
  folderNumber: varchar("num_carpeta", { length: 30 }).notNull(),
  folderNumber2: varchar("num_carpeta2", { length: 30 }).notNull(),
  court: varchar("despacho", { length: 255 }).notNull(),
  radicadoIni: varchar("num_radicado_ini", { length: 30 }).notNull(),
  dateRadicadoIni: varchar("fecha_radicado_ini", { length: 30 }).notNull(),
  radicadoTribunal: varchar("radicado_tribunal", { length: 30 }).notNull(),
  magistrate: varchar("magistrado", { length: 30 }).notNull(),
  jurisdiction: varchar("jurisdiccion", { length: 30 }).notNull(),
  processClass: varchar("clase_proceso", { length: 255 }).notNull(),
  status: varchar("estado", { length: 30 }).notNull(),
  sentenceJuzgado: varchar("sentencia_juzgado", { length: 30 }).notNull(),
  sentenceTribunal: varchar("sentencia_tribunal", { length: 30 }).notNull(),
  clientId: bigint("identidad_clientes", { mode: 'number', unsigned: true }).notNull(),
  clientName: varchar("nombres_demandante", { length: 255 }).notNull(),
  defendantId: int("identidad_demandado", { unsigned: true }).notNull(),
  defendantName: varchar("nombres_demandado", { length: 255 }).notNull(),
  businessLine: varchar("negocio", { length: 50 }).notNull(),
  lawyerId: int("identidad_abogados", { unsigned: true }).notNull(),
  lawyerName: varchar("nombres_apoderado", { length: 255 }).notNull(),
  radicadoUlt: varchar("num_radicado_ult", { length: 30 }).notNull(),
  radicadoCorte: varchar("radicado_corte", { length: 30 }).notNull(),
  magistrateCorte: varchar("magistrado_corte", { length: 30 }).notNull(),
  casacion: varchar("casacion", { length: 30 }).notNull(),
  description: varchar("descripcion", { length: 255 }).notNull(),
});

// Table: demandantes
export const demandantes = mysqlTable("demandantes", {
  processId: int("num_registro").notNull(),
  firstNames: varchar("nombre_demandante", { length: 255 }).notNull(),
  id: varchar("identidad_demandante", { length: 255 }).notNull(),
  powerOfAttorney: varchar("poder", { length: 10 }),
});

// Table: clases_procesos
export const processTypes = mysqlTable("clases_procesos", {
  id: serial("auto").primaryKey(),
  court: varchar("clases_procesos", { length: 255 }),
});
// Table: expevida
export const lifeExpectancy = mysqlTable("expevida", {
  age: int("EDAD").primaryKey(),
  maleExp: int("EXM"),
  femaleExp: int("EXF"),
});

// Table: datos_fallecidos
export const deceasedData = mysqlTable("datos_fallecidos", {
  clientId: varchar("CEDULA_DEL_BENEFICIARIO", { length: 255 }).primaryKey(),
  deceasedBirthDate: varchar("FECHA_DE_NACIMIENTO_DEL_JUBILADO", { length: 255 }),
  deathDate: varchar("FECHA_FALLECIMIENTO", { length: 255 }),
  widowStatus: int("VIUDAS_CON_Y_SIN_CONCILIAR"),
  relationship: varchar("PARENTESCO", { length: 255 }),
  curatorName: varchar("NOMBRE_DEL_CURADOR", { length: 255 }),
  curatorId: varchar("CEDULA_DEL_CURADOR", { length: 255 }),
  bond: varchar("VINCULO", { length: 255 }),
});

// Table: anotaciones
export const annotations = mysqlTable("anotaciones", {
  id: serial("auto").primaryKey(),
  processId: int("num_registro"),
  date: varchar("fecha", { length: 12 }),
  type: varchar("clase", { length: 9 }),
  limitDate: varchar("fecha_limite", { length: 10 }),
  limitHour: varchar("hora_limite", { length: 8 }),
  annotation: varchar("detalle", { length: 3000 }),
  visualize: varchar("visualizar", { length: 4 }),
  proceduralStatus: text("estado_procesal").notNull(),
  courts: int("despachos").notNull(),
  registrationDate: varchar("fecha_registro", { length: 10 }),
  registrationHour: varchar("hora_registro", { length: 8 }),
  documentName: varchar("nombre_documento", { length: 255 }),
  fileUrl: text("archivo_url"),
});

// Table: anexos (Files)
export const annexes = mysqlTable("anexos", {
  id: serial("auto").primaryKey(),
  processId: int("num_registro").notNull(),
  fileDate: varchar("fecha_documento", { length: 30 }).notNull(),
  fileName: varchar("nombre_documento", { length: 255 }).notNull(),
  description: varchar("descripccion", { length: 255 }).notNull(),
  uploadDate: date("fecha_subida"),
  content: text("contenido"), // Was blob in DESCRIBE, but Drizzle text works well for large data or I could use customType
  fileType: varchar("tipo_archivo", { length: 50 }),
  filePath: varchar("ruta_archivo", { length: 255 }),
});

// Table: parametros
export const parameters = mysqlTable("parametros", {
  id: int("COD"),
  name: varchar("DESCRIPCION", { length: 255 }),
  type: varchar("ETIQUETA", { length: 2 }),
});

// Table: pretension_documento
export const pretensionDocumentMapping = mysqlTable("pretension_documento", {
  pretensionId: int("PRETENSION"),
  documentId: int("DOCUMENTO"),
});

// Table: inv_documen (Pensioner Documents Inventory)
export const pensionerDocuments = mysqlTable("inv_documen", {
  clientId: varchar("CEDULA", { length: 17 }),
  pretensionId: int("PRETENCION"),
  documentId: int("DOC"),
  status: varchar("EDO", { length: 2 }),
  reference: varchar("REF", { length: 74 }),
  date: varchar("FECHA", { length: 10 }),
  dueDate: varchar("VENCE", { length: 10 }),
});
