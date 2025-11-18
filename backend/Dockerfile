# Usa una imagen base de Java
FROM eclipse-temurin:21-jdk-alpine

# Copia el archivo JAR final (¡Nombre exacto!)
COPY target/sistema-ventas-vehiculos-0.0.1-SNAPSHOT.jar app.jar

# Puerto por defecto de Spring Boot
EXPOSE 8080

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]