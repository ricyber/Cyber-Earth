// --- CONFIGURACIÓN BÁSICA DE THREE.JS ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// --- LUCES ---
const ambientLight = new THREE.AmbientLight(0x555555);
scene.add(ambientLight);

// --- CREACIÓN DEL FONDO ESTRELLADO PROCEDURAL ---
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.8
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// --- CREACIÓN DE LA TIERRA DIGITAL (PROCEDURAL) ---
const earth = new THREE.Group();

// 1. Esfera interior (el "océano")
const innerSphereGeometry = new THREE.SphereGeometry(15, 64, 64);
const innerSphereMaterial = new THREE.MeshBasicMaterial({ color: 0x002b11 });
const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
earth.add(innerSphere);

// 2. Esfera exterior (la "malla" o "wireframe")
const wireframeGeometry = new THREE.SphereGeometry(15.1, 32, 32);
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff41,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
earth.add(wireframeSphere);

scene.add(earth);

// --- DATOS DE PAÍSES Y CONTENIDO ---
const countries = {
    chile: { lat: -33.4489, lon: -70.6693, name: "Chile" },
    alemania: { lat: 52.5200, lon: 13.4050, name: "Alemania" },
    rusia: { lat: 55.7558, lon: 37.6173, name: "Rusia" },
    eeuu: { lat: 38.9072, lon: -77.0369, name: "EE.UU" },
    reinoUnido: { lat: 51.5074, lon: -0.1278, name: "Reino Unido" },
    australia: { lat: -35.2809, lon: 149.1300, name: "Australia" },
    canada: { lat: 45.4215, lon: -75.6972, name: "Canadá" },
    nuevaZelanda: { lat: -41.2865, lon: 174.7762, name: "Nueva Zelanda" },
    suecia: { lat: 59.3293, lon: 18.0686, name: "Suecia" },
    ucrania: { lat: 50.4501, lon: 30.5234, name: "Ucrania" },
};

const langData = {
    es: {
        title: "Cyber-Tierra",
        close_button: "CERRAR",
        help_message: "[Ayuda]: Busca y toca en un punto en el Cyber-Tierra para buscar información",
        accessing_server: ">> ACCEDIENDO A SERVIDORES (",
        connection_established: ">> [ESTADO]: CONEXIÓN ESTABLECIDA <<",
        classified_data: ">> [ALERTA]: DATOS CLASIFICADOS DETECTADOS <<",
        cyber_info_chile: "Ciberataques masivos en pandemia<br>" +
                           "Año: 2020<br>" +
                           "Pais: Chile<br>" +
                           "Acción: >> Durante 2020, se registraron más de 2.300 millones de intentos de ciberataque en Chile, especialmente entre octubre y diciembre. El phishing fue el método más común, y se produjo un incremento de siete veces en ataques de tipo ransomware.",
        cyber_info_alemania: "Sven Jaschan<br>" +
                           "Año: 2004<br>" +
                           "Pais: Alemania<br>" +
                            "Acción: >> A los 18 años creó el gusano Sasser (y Netsky), que infectó millones de equipos Windows y causó interrupciones, incluyendo la caída del sistema de Delta Airlines. Se estima que causó pérdidas por más de USD 500 millones.",
        cyber_info_rusia: "Vladimir Levin<br>" +
                           "Año: 1995<br>" +
                           "Pais: Rusia<br>" +
                           "Acción: >> Desde San Petersburgo, hackeó el sistema informático de Citibank en Nueva York y realizó transferencias fraudulentas de alrededor de USD 10 millones. Fue extraditado a EE. UU. y condenado",
        cyber_info_eeuu: "Kevin Mitnick<br>" +
                           "Año: 1979–1995<br>" +
                           "Pais: Estado Unidos<br>" +
                           "Acción: >> A los 16 años (1979), accedió sin autorización al sistema The Ark de Digital Equipment Corporation (DEC), copiando software. Continuó con hacks más sofisticados, incluyendo sistemas de Pacific Bell, Sun Microsystems y Motorola, usando ingeniería social y clonación de teléfonos celulares. Fue arrestado en 1995, tras una cacería del FBI. (Nota: culturalmente, se le considera uno de los hackers más famosos de EE. UU.)",
        cyber_info_reinoUnido: "WannaCry – NHS\n" +
                           "Año: 2017\n" +
                           "Pais: Reino Unido<br>" +
                           "Acción: >> El ransomware WannaCry infectó miles de equipos del Servicio Nacional de Salud (NHS), cifrando datos y bloqueando sistemas médicos. Esto provocó la cancelación de miles de citas y cirugías, y afectó la atención en hospitales y centros médicos. El ataque se propagó rápidamente a nivel global y fue atribuido a actores vinculados a Corea del Norte.",
        cyber_info_australia: "Optus – Brecha masiva de datos\n" +
                           "Año: 2022<br>" +
                           "Pais: Australia<br>" +
                           "Acción: >> Un ciberataque a la operadora de telecomunicaciones Optus expuso información personal de aproximadamente 9,8 millones de clientes, incluyendo números de pasaporte, licencias de conducir y datos de contacto. La magnitud del incidente generó un fuerte debate sobre ciberseguridad y privacidad en Australia.",
        cyber_info_canada: "Michael Calce (MafiaBoy)<br>" +
                           "Año: 2000<br>" +
                           "Pais: Canada<br>" +
                           "Acción: >> Con apenas 15 años, lanzó Project Rivolta, una serie de ataques DDoS contra sitios como Yahoo!, Amazon, Dell, eBay y CNN, provocando interrupciones masivas y pérdidas estimadas de USD 1.2 mil millones.",
        cyber_info_nuevaZelanda: "Owen Walker (AKILL)<br>" +
                           "Año: 2007–2008<br>" +
                           "Pais: Nueva Zelanda<br>" +
                           "Acción: >> Como líder de una organización de botnets, causó aproximadamente USD 26 millones en daños globales, involucrando sistemas como la Universidad de Pensilvania. Fue procesado, multado, pero quedó sin condena, y luego contratado como consultor de seguridad.",
        cyber_info_suecia: "Philip Gabriel Pettersson (Stakkato)<br>" +
                           "Año: 2003–2005<br>" +
                           "Pais: Suecia<br>" + 
                           "Acción: >> A los 16 años, accedió a sistemas del Departamento de Defensa de EE. UU., NASA, Caltech, Stanford, entre otros, usando exploits avanzados. Obtuvo acceso al código fuente de Cisco IOS, lo que permitió crear backdoors y controlar routers globalmente. Fue investigado en 2005 y procesado en Suecia en 2009.",
        cyber_info_ucrania: "NotPetya – Ataque destructivo<br>" +
                           "Año: 2017<br>" +
                           "Pais: Ucrania<br>" +
                           "Acción: >> El malware NotPetya afectó ministerios, bancos, el sistema de metro y empresas estatales ucranianas. Aunque aparentaba ser ransomware, su diseño lo hacía esencialmente destructivo. El ataque causó enormes pérdidas económicas en Ucrania y se expandió a empresas internacionales, siendo atribuido a grupos vinculados al gobierno ruso.",
        copyright_text: "© 2025 Cyber-Tierra. Creado por Ricardo Salazar.",
    },
    en: {
        title: "Cyber-Earth",
        close_button: "CLOSE",
        help_message: "[Help]: Search and tap a point on Cyber-Earth to search for information",
        accessing_server: ">> ACCESSING SERVERS (",
        connection_established: ">> [STATUS]: CONNECTION ESTABLISHED <<",
        classified_data: ">> [ALERT]: CLASSIFIED DATA DETECTED <<",
        cyber_info_chile: "Massive cyberattacks during the pandemic<br>" +
                           "Year: 2020<br>" +
                           "Country: Chile<br>" +
                           "Action: >> During 2020, more than 2.3 billion cyberattack attempts were recorded in Chile, especially between October and December. Phishing was the most common method, and there was a sevenfold increase in ransomware attacks.",
        cyber_info_alemania: "Sven Jaschan<br>" +
                             "Year: 2004<br>" +
                             "Country: Germany<br>" +
                             "Action: >> At 18, he created the Sasser worm (and Netsky), which infected millions of Windows computers and caused disruptions, including the Delta Airlines system crash. It is estimated to have caused losses of over $500 million.",
        cyber_info_rusia: "Vladimir Levin<br>" +
                          "Year: 1995<br>" +
                          "Country: Russia<br>" +
                          "Action: >> From St. Petersburg, he hacked into Citibank's computer system in New York and made fraudulent transfers totaling approximately $10 million. He was extradited to the US and convicted.",
        cyber_info_eeuu: "Kevin Mitnick<br>" +
                         "Year: 1979–1995<br>" +
                         "Country: United States<br>" +
                         "Action: >> At age 16 (1979), he gained unauthorized access to Digital Equipment Corporation's (DEC) The Ark system, copying software. He went on to more sophisticated hacks, including those of Pacific Bell, Sun Microsystems, and Motorola, using social engineering and cell phone cloning. He was arrested in 1995 after an FBI manhunt. (Note: Culturally, he is considered one of the most famous hackers in the US.)",
        cyber_info_reinoUnido: "WannaCry – NHS<br>" +
                         "Year: 2017<br>" +
                         "Country: united Kingdom<br>" +
                         "Action: >> The WannaCry ransomware infected thousands of National Health Service (NHS) computers, encrypting data and shutting down medical systems. This led to the cancellation of thousands of appointments and surgeries, and disrupted care in hospitals and medical centers. The attack quickly spread globally and was attributed to actors linked to North Korea.",
        cyber_info_australia: "Optus – Massive data breach<br>" +
                         "Year: 2022<br>" +
                         "Country: Australia<br>" +
                         "Action: >> A cyberattack on the telecommunications operator Optus exposed the personal information of approximately 9.8 million customers, including passport numbers, driver's licenses, and contact information. The scale of the incident sparked a heated debate about cybersecurity and privacy in Australia.",
        cyber_info_canada: "Michael Calce (MafiaBoy)<br>" +
                         "Year: 2000<br>" +
                         "Country: Canadá<br>" +
                         "Action: >> At just 15 years old, he launched Project Rivolta, a series of DDoS attacks against sites like Yahoo!, Amazon, Dell, eBay, and CNN, causing massive outages and an estimated $1.2 billion in losses.",
        cyber_info_nuevaZelanda: "Owen Walker (AKILL)<br>" +
                         "Year: 2007–2008<br>" +
                         "Country: New Zealand<br>" +
                         "Action: >> As the leader of a botnet organization, he caused approximately $26 million in global damage, involving systems such as the University of Pennsylvania. He was prosecuted, fined, but not convicted, and later hired as a security consultant.",
        cyber_info_suecia: "Philip Gabriel Pettersson (Stakkato)<br>" +
                         "Year: 2003–2005<br>" +
                         "Country: Sweden<br>" +
                         "Action: >> At the age of 16, he accessed systems at the U.S. Department of Defense, NASA, Caltech, Stanford, and other sites using advanced exploits. He gained access to the Cisco IOS source code, allowing him to create backdoors and take over routers globally. He was investigated in 2005 and prosecuted in Sweden in 2009.",
        cyber_info_ucrania: "NotPetya – Destructive attack<br>" +
                         "Year: 2017<br>" +
                         "Country: Ukraine<br>" +
                         "Action: >> The NotPetya malware affected Ukrainian ministries, banks, the metro system, and state-owned enterprises. Although it appeared to be ransomware, its design made it essentially destructive. The attack caused enormous economic losses in Ukraine and spread to international companies, and was attributed to groups linked to the Russian government.",
        copyright_text: "© 2025 Cyber-Earth. Created by Ricardo Salazar.",
    }
};

// --- CREACIÓN DE MARCADORES PARA PAÍSES ---
const markers = new THREE.Group();
const markerGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff41 });

function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
}

for (const countryKey in countries) {
    const country = countries[countryKey];
    const marker = new THREE.Mesh(markerGeometry, markerMaterial.clone());
    const position = latLonToVector3(country.lat, country.lon, 15);
    marker.position.copy(position);
    marker.userData.country = countryKey;
    markers.add(marker);
}
earth.add(markers);

// --- ESTRELLAS FUGACES ---
function createShootingStar() {
    const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);

    star.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        -200
    );
    scene.add(star);

    gsap.to(star.position, {
        x: star.position.x * -2,
        y: star.position.y * -2,
        z: 200,
        duration: Math.random() * 8 + 6,
        ease: "power2.in",
        onComplete: () => scene.remove(star)
    });
}
setInterval(createShootingStar, 1000);

// --- INTERACTIVIDAD Y ANIMACIÓN CON GSAP ---
gsap.to(earth.rotation, { y: Math.PI * 2, duration: 120, repeat: -1, ease: "none" });

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let dragDelta = { x: 0, y: 0 };

renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
    dragDelta = { x: 0, y: 0 };
});

renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
    // Reinicia la rotación automática al soltar el clic
    gsap.to(earth.rotation, { y: earth.rotation.y + Math.PI * 2, duration: 120, repeat: -1, ease: "none" });
});

renderer.domElement.addEventListener('mouseleave', () => {
    isDragging = false;
    // Reinicia la rotación si el cursor sale del área del canvas
    gsap.to(earth.rotation, { y: earth.rotation.y + Math.PI * 2, duration: 120, repeat: -1, ease: "none" });
});

renderer.domElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
    };
    dragDelta.x += Math.abs(deltaMove.x);
    dragDelta.y += Math.abs(deltaMove.y);

    gsap.killTweensOf(earth.rotation);
    earth.rotation.y += deltaMove.x * 0.005;
    earth.rotation.x += deltaMove.y * 0.005;

    previousMousePosition = { x: e.offsetX, y: e.offsetY };
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    if (dragDelta.x > 5 || dragDelta.y > 5) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(markers.children);

    if (intersects.length > 0) {
        const clickedMarker = intersects[0].object;
        const countryKey = clickedMarker.userData.country;
        
        const worldPosition = new THREE.Vector3();
        clickedMarker.getWorldPosition(worldPosition);

        gsap.to(camera.position, {
            x: worldPosition.x * 2,
            y: worldPosition.y * 2,
            z: worldPosition.z * 2,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: function() {
                camera.lookAt(earth.position);
            },
            onComplete: () => {
                showInfoModal(countryKey);
            }
        });
    }
});

const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalInfo = document.getElementById('modal-info');
const closeModalBtn = document.getElementById('close-modal');

// Función para la animación de texto, ahora usando innerHTML
function animateText(element, text, delay) {
    let i = 0;
    element.innerHTML = ''; // Usamos innerHTML para evitar que se muestren las etiquetas
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (i < text.length) {
                // Aquí es donde cambiamos la lógica: si encontramos '<', esperamos a que la etiqueta completa se escriba
                if (text.charAt(i) === '<') {
                    const tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += text.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}

function showInfoModal(countryKey) {
    const currentLang = document.documentElement.lang;
    const countryData = countries[countryKey];
    
    modalTitle.textContent = '';
    modalInfo.innerHTML = '';

    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');

    const countryName = countryData.name;
    const cyberInfoText = langData[currentLang][`cyber_info_${countryKey}`] || "Información no disponible.";
    const accessingText = langData[currentLang].accessing_server + countryName + ") ...";
    const connectionText = langData[currentLang].connection_established;
    const classifiedDataText = langData[currentLang].classified_data;

    const fullText = `
    <div>${accessingText}</div><br>
    <div>${connectionText}</div><br><br>
    <div>${cyberInfoText}</div><br><br>
    <div>${classifiedDataText}</div>`; 

    animateText(modalTitle, countryName, 50)
        .then(() => {
            animateText(modalInfo, fullText, 25);
        });
}

closeModalBtn.addEventListener('click', () => {
    gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 30,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(earth.position)
    });
    modal.classList.remove('modal-visible');
    modalTitle.textContent = '';
    modalInfo.innerHTML = '';
    setTimeout(() => modal.classList.add('modal-hidden'), 500);

    // NUEVA LÍNEA: Reinicia la rotación de la Tierra después de cerrar el modal
    gsap.to(earth.rotation, { y: earth.rotation.y + Math.PI * 2, duration: 120, repeat: -1, ease: "none" });
});

const langButtons = document.querySelectorAll('.language-switcher button');
function changeLanguage(lang) {
    document.documentElement.lang = lang;
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    elementsToTranslate.forEach(elem => {
        const key = elem.dataset.key;
        if (langData[lang] && langData[lang][key]) {
            elem.textContent = langData[lang][key];
        }
    });
}

langButtons.forEach(button => {
    button.addEventListener('click', () => changeLanguage(button.dataset.lang));
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

changeLanguage('es');