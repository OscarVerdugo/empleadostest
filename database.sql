
-- CREATE TABLE CTL_Turnos(
--     nIdTurno INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     cDescripcion VARCHAR(50) NOT NULL,
--     bEstatus BIT NOT NULL DEFAULT(1)
-- );

-- CREATE TABLE CTL_Tipo_Incidentes(
--     nIdTipo_Incidente INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     cDescripcion VARCHAR(50) NOT NULL,
--     bEstatus BIT NOT NULL DEFAULT(1)
-- );

-- CREATE TABLE CTL_Areas(
--     nIdArea INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     cDescripcion VARCHAR(50) NOT NULL,
--     bEstatus BIT NOT NULL DEFAULT(1)
-- );

-- CREATE TABLE CTL_Sub_Areas(
--     nIdSubArea INT NOT NULL PRIMARY KEY IDENTITY(1,1),
--     cDescripcion VARCHAR(50) NOT NULL,
--     bEstatus BIT NOT NULL DEFAULT(1)
-- );

CREATE TABLE CTL_Tipo_Personal(
    nIdTipo_Personal INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    cDescripcion VARCHAR(50) NOT NULL,
    nIdSubArea INT NOT NULL,
    bEstatus BIT NOT NULL DEFAULT(1),
    CONSTRAINT FK_nIdSubArea_CTL_Tipo_Personal FOREIGN KEY(nIdSubArea) REFERENCES CTL_Sub_Areas(nIdSubArea)
);

CREATE TABLE CTL_Personal(
    nIdPersonal INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    cNombre VARCHAR(50) NOT NULL,
    cP_Apellido VARCHAR(50) NOT NULL,
    cS_Apellido VARCHAR(50) NOT NULL,
    cNum_Empleado VARCHAR(10) NOT NULL,
    nIdTipo_Personal INT NOT NULL,
    cContra VARCHAR(20) NOT NULL,
    bAdmin BIT NOT NULL DEFAULT(0),
    bEstatus BIT NOT NULL DEFAULT(1),
    CONSTRAINT FK_nIdTipo_Cliente_CTL_Personal FOREIGN KEY (nIdTipo_Personal) REFERENCES CTL_Tipo_Personal(nIdTipo_Personal)
);



CREATE TABLE RH_Demografias(
    nIdDemografia INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    cCalle VARCHAR(50) NOT NULL,
    cNumero VARCHAR(15) NOT NULL,
    cMunicipio VARCHAR(50) NOT NULL,
    cCp VARCHAR(10) NOT NULL,
    nIdPersonal INT NOT NULL,
    bEstatus BIT NOT NULL DEFAULT(1),
    CONSTRAINT FK_nIdPersonal_RH_Demografias FOREIGN KEY(nIdPersonal) REFERENCES CTL_Personal(nIdPersonal)
);

CREATE TABLE RH_Telefonos(
    nIdTelefono INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    cTipo_Tel VARCHAR(50) NOT NULL,
    cTelefono VARCHAR(15) NOT NULL,
    nIdPersonal INT NOT NULL,
    bEstatus BIT NOT NULL DEFAULT(1),
    CONSTRAINT FK_nIdPersonal_RH_Telefonos FOREIGN KEY(nIdPersonal) REFERENCES CTL_Personal(nIdPersonal)
);

CREATE TABLE RH_Tipo_Personal_Detalles(
    nIdSubArea INT NOT NULL,
    nIdPersonal INT NOT NULL,
    CONSTRAINT FK_nIdSubArea_RH_Tipo_Personal_Detalles FOREIGN KEY(nIdSubArea) REFERENCES CTL_Sub_Areas(nIdSubArea),
    CONSTRAINT FK_nIdPersonal_RH_Tipo_Personal_Detalles FOREIGN KEY(nIdPersonal) REFERENCES CTL_Personal(nIdPersonal)
);

CREATE TABLE RH_Fotos(
    nIdFoto INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    cDescripcion VARCHAR(50) NOT NULL,
    cRuta VARCHAR(50) NOT NULL,
    cNom_Foto VARCHAR(50) NOT NULL,
    nIdPersonal INT NOT NULL,
    bEstatus BIT NOT NULL DEFAULT(1),
    CONSTRAINT FK_nIdPersonal_RH_Fotos FOREIGN KEY(nIdPersonal) REFERENCES CTL_Personal(nIdPersonal)
);

CREATE TABLE RH_Correos(
    nIdCorreo INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    cCorreo VARCHAR(50) NOT NULL,
    cPrincipal VARCHAR(50) NOT NULL,
    nIdPersonal INT NOT NULL,
    bEstatus BIT NOT NULL DEFAULT(1),
    CONSTRAINT FK_nIdPersonal_RH_Correos FOREIGN KEY(nIdPersonal) REFERENCES CTL_Personal(nIdPersonal)
);

CREATE TABLE RH_Incidencias(
    nIdIncidencia INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    nIdTipo_Incidente INT NOT NULL,
    nIdTurno INT NOT NULL,
    nIdPersonal INT NOT NULL,
    dFecha_Registro DATETIME NOT NULL,
    dFecha_Inicio DATETIME NOT NULL,
    dFecha_Fin DATETIME NOT NULL,
    bEstatus BIT NOT NULL DEFAULT(1),
    nEstado INT NOT NULL DEFAULT(0),
    CONSTRAINT FK_nIdTipo_Incidente_RH_Incidencias FOREIGN KEY(nIdTipo_Incidente) REFERENCES CTL_Tipo_Incidentes(nIdTipo_Incidente),
    CONSTRAINT FK_nIdTurno_RH_Incidencias FOREIGN KEY(nIdTurno) REFERENCES CTL_Turnos(nIdTurno),
    CONSTRAINT FK_nIdPersonal_RH_Incidencias FOREIGN KEY(nIdPersonal) REFERENCES CTL_Personal(nIdPersonal)
);



