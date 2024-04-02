# Análisis de datos

*El texto de este documento está basado en el libro "Data mining and analysis" de Mohammed J. Zaki y
Wagner Meira Jr."*

La minería de datos es el proceso de descubrir patrones y modelos a partir de grandes cantidades de datos. Estos patrones han de ser nuevos, interesantes y que aporten conocimiento. Con respecto a lol modelos estos han de ser descriptivos, compresibles y con capacidad predictiva. Para lograr esto se realizaran una serie de tareas: análisis exploratorio, búsqueda de patrones de frecuencia, *clustering* y clasificación.

## Conceptos básicos

### La matriz de datos

Los datos se pueden representar frecuentemente como una matriz $n \times d$ con $n$ filas y $d$ columnas, donde las filas se corresponden con las entidades (u observaciones) del *dataset* y las columnas con las propiedades o atributos (variables) de interés. Cada fila de la matriz registra el valor observado para el atributo para una determinada entidad. **Nombres de las columnas:** *atributos*, *variables*, *características*, *propiedades*, *dimensiones*, *campos*, etc.

**Nombres de las filas:** *entidades*, *instancias*, *objetos*, *ejemplos*, *registros*, *puntos*, *transacciones*, etc.

El número de instancias (filas) $n$ se denomina *tamaño* del *dataset* y el número de atributos (columnas) $d$ se denomina *dimensión* del *dataset*.

El análisis de un atributo en particular se denomina *análisis univariante* y el análisis de dos o más atributos se denomina *análisis multivariante*.

### Minería de datos

La minería de datos se compone de una serie de algoritmos que nos permiten obtener información útil y conocimiento a partir de cantidades ingentes de datos. Es un campo interdisciplinar que combina conceptos de los sistemas de bases de datos, estadística, *machine learning* y reconocimiento de patrones. La minería de datos es a su vez parte de un proceso aún más grande que comprende que incluye el preprocesado de los datos (limpieza, fusión, reducción de características, etc.), así como el postprocesado (interpretación de patrones y modelos, generación y confirmación de hipótesis, etc.)

Algunos de los elementos fundamentales del análisis de datos, imprescindibles para llevar a cabo el resto de las tareas, son el **análisis exploratorio de los datos**, **búsqueda de patrones comunes**, **clustering** y **modelos de clasificación**.

#### Análisis exploratorio de los datos

El análisis exploratorio se enfoca en los atributos numéricos y categóricos de los datos de manera individual o conjunta para extraer características relevantes de la muestra de datos mediante estadísticas. Estas estadísticas nos darán información sobre la centralidad, dispersión, etc. de los datos.

Dado que en *big data* trabajamos con *datasets* enormes de miles de *atributos* y millones de *observaciones*, otro de los objetivos de este análisis exploratorio es el de reducir la cantidad de datos a analizar. Por ejemplo, los métodos de *selección de características* y *reducción de dimensionalidad* se emplean para seleccionar las variables más importantes, los métodos de *discretización* se usarán para reducir el número de valores posibles de una variable, los *métodos de muestreo* para reducir el tamaño de los datos, etc.

#### Búsqueda de patrones

La búsqueda de patrones comunes consiste en la tarea de extraer patrones útiles e informativos sobre *datasets* enormes y complejos. Los patrones pueden consistir en conjuntos de valores de atributos que ocurren simultáneamente con una frecuencia significativa (llamados *itemsets*), secuencias de valores (que consideran relaciones de precedencia posicionales o temporales), grafos (que consideran relaciones arbitrarias entre *puntos*).

El objetivo último de estas técnicas es tendencias *ocultas* y comportamientos en los datos que nos permitan comprender mejor las interacciones entre los *puntos* y los atributos.

#### *Clustering*

*Clustering* es la tarea de agrupar las *puntos* u observaciones en *grupos naturales* llamados *clusters*, de manera tal que los *puntos* dentro de un mismo *cluster* sean más similares entre sí que los *puntos* de otros *clusters*. Dependiendo de los datos y de las características de agrupamiento deseadas, existen diferentes paradigmas de *clustering* como el basado en representación (*K-medias*, *expectation-maximization*, etc.), el *clustering* jerárquico, basado en densidad, etc.

#### Clasificación

La tarea de clasificación consiste en predecir la *etiqueta* o *clase* de una observación o punto. Esto se hará a partir de un *clasificador* que es a su vez un modelo o función que permite predecir la clase de dicho punto. Para crear uno de estos modelos se necesitará a su vez un conjunto de puntos ya clasificados (conjunto de entrenamiento) que permita al *clasificador* aprender a predecir la clase de nuevos puntos.

Existen diferentes tipos de modelos de clasificación como los *árboles de decisión*, clasificadores probabilísticos, etc.

## Atributos numéricos

En este apartados veremos algunos métodos estadísticos básicos para el análisis exploratorio de atributos numéricos. Primero veremos análisis univariante y después análisis multivariante.

### Análisis univariante

Cuando hablamos de análisis univariante nos esteremos refiriendo al análisis de una sosa variable o *columna* de la matriz de datos a la que podremos ver como un vector.

#### Medidas de tendencia central

Estas medidas nos dan una idea a cerca de la *centralidad* de los datos, los valores "medios", etc.

##### Media y media muestral

La media o *valor esperado* de un atributo numérico $X$ es la media aritmética de los valores de $X$. Nos indica la *tendencia central* de los valores de $X$.

$$ \mu = E[X] = \sum_{x} x \cdot f(x) $$

Donde $f(x)$ es la función de densidad de probabilidad de $X$.

###### Media muestral

Puesto que la *población* es generalmente desconocida, se suele estimar la media de una *muestra* de la misma. La media muestral se calcula como:

$$ \bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i $$

###### Mediana

La mediana es el valor *más central* de los valores de $X$. Esto significa que el 50% de los valores de X serán menores que la mediana y el 50% serán mayores.

Hay varias formas de calcular la mediana pero la más sencilla es ordenar los valores de $X$ y luego tomar el valor central, si el número de valores es impar. Si el número de valores es par se considerarán medianas los dos valores centrales (usualmente se calcula su media).

##### Moda

La moda es el valor que más se repite en los valores de $X$. Puede no ser una medida muy indicativa de la tendencia central pues a veces el valor que más se repite no coincide con el más *central*.

#### Medidas de dispersión

Estas medidas nos dan una indicación sobre la dispersión o variabilidad en los valores de la variable.

##### Rango

El rango de valores o rango de de una variable aleatoria $X$ es la diferencia entre el valor máximo y el valor mínimo de $X$. Nos da una idea de la variabilidad de los valores de $X$. Se calcula como:

$$ r = \max \{ X \} - \min \{ X \} $$

El rango de $X$ es un parámetro d la población que no debe de confundirse con el rango de la función $X$, que es el conjunto de todos los valores posibles de $X$.

El rango de una muestra es una estadística que se calcula como:

$$ \hat{r} = \max_{i = 1}^{n} \{ X \} - \min_{i = 1}^{n} \{ X \} $$

##### Rango intercuartílico

Los *cuartiles* son valores especiales de la función cuantil (función de distribución) que dividen a los valores de $X$ en cuatro partes iguales. Es decir, los cuartiles se corresponden con los valores cuantiles de $0,25$ ($Q_1$), $0,5$ ($Q_2$), $0,75$ ($Q_3$) y $1$. El primer cuartil deja a su izquierda el 25% de los valores de $X$, el segundo cuartil el 50%, etc.

Una mejor medida de la dispersión de $X$ es el rango intercuartílico, que se calcula como:

$$ IQR = Q_3 - Q_1 $$

Es decir, el rango de $X$ *despreciando* el 25% de los valores extremos.

##### Varianza y desviación típica

La varianza de la variable aleatoria $X$ nos da una medida de cuánto se alejan los valores de $X$ de la media o valor esperado de $X$.

$$ \sigma^2 = E[(X - \mu)^2] = \sum_{x} (x - \mu)^2 f(x) \; \text{ si } X \text{ es discreta} $$

y

$$ \sigma^2 = E[(X - \mu)^2] = \int_{-\infty}^{\infty} (x - \mu)^2 f(x) dx \; \text{ si } X \text{ es continua} $$

Por su parte, la *desviación típica* es la raíz cuadrada positiva de la varianza.

De este modo la varianza muestral se calcula como:

$$ \hat{\sigma}^2 = \frac{1}{n - 1} \sum_{i = 1}^{n} (x_i - \hat{\mu})^2 $$

donde $\hat{\mu}$ es la media muestral.

Y la desviación típica muestral es la raíz cuadrada de la varianza muestral.

$$ \hat{\sigma} = \sqrt{ \frac{1}{n} \sum_{i = 1}^{n}{(x_i - \hat{ \mu })^2 } } $$

### Análisis bivariante

En el análisis bivariante consideramos dos atributos o variables al mismo tiempo. En este caso nos interesa entender la asociación o dependencia entre ellos, si es que la hay. De estas menara restringimos el análisis a los dos atributos numéricos $X_1$ y $X_2$ con los datos $D$ representados por una matriz $n \times 2$.

#### Medidas de asociación

##### Covarianza

La covarianza entre dos atributos $X_1$ y $X_2$ nos da una medida de la asociación lineal o dependencia entre ellos y se define como:

$$ \sigma_{12} = E[(X_1 - \mu_1)(X_2 - \mu_2)] $$

Si $X_1$ y $X_2$ son independientes su covarianza será cero. Sin embargo la afirmación opuesta no es cierta. Si $\sigma_{12} = 0$ no podemos afirmar que $X_1$ y $X_2$ sean independientes. Lo único que podremos concluir es que no hay asociación **lineal** entre ellos pero no podremos descartar que exista una relación de mayor orden.

##### Correlación

La correlación entre dos variables $X_1$ y $X_2$ es la covarianza estandarizada. Es decir, el resultado de normalizar la covarianza por las desviaciones típicas de $X_1$ y $X_2$:

$$ \rho_{12} = \frac{\sigma_{12}}{\sigma_1 \sigma_2} $$

La *correlación muestral* vendrá dada por:

$$ \hat{\rho}_{12} = \frac{\hat{\sigma}_{12}}{\hat{\sigma}_1 \hat{\sigma}_2} = \frac{\sum_{i = 1}^{n}{(x_{i1} - \hat{\mu}_1)(x_{i2} - \hat{\mu_2})}}{\sqrt{\sum_{i = 1}^{n}{(x_{i1} - \hat{\mu}_1)^2}\sum_{i=1}^{n}{(x_{i2} - \hat{\mu}_2)^2}}}$$

Fórmulas a parte, el **coeficiente de correlación** para dos variables, compara la distancia de cada dato puntual a la media de la variable y utiliza esta comparación para indicarnos hasta qué punto la relación entre las variables se ajusta a una línea imaginaria trazada entre los datos.
