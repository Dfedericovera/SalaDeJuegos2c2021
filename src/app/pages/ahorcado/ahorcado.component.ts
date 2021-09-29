import { Component, OnInit } from '@angular/core';
import { JuegoAhorcado } from 'src/app/clases/juego-ahorcado';
import { JuegoService } from 'src/app/services/juego.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit
{
  tabla = ["abaratar", "diluviar", "maltratar", "abarcar", "diseminar", "mandar", "aborrecer", "disentir", "manipular", "acalorar", "disgregar", "mencionar", "acatar", "doblez", "mendigar", "aceptar", "dominar", "mental", "acicalar", "dramatizar", "mudar", "acomodar", "dudar", "mundial", "acoplar", "dudar", "musical", "acorralar", "ecuatorial", "musicalizar", "acusar", "edificar", "natural", "adaptador", "embarcar", "naturalidad", "adecuar", "embaucar", "necedad", "adiestrador", "empezar", "necesidad", "adivinar", "empezar", "negociar", "adjudicador", "emprendedor", "neonatal", "adjudicar", "encantar", "neutral", "administrar", "encasillar", "obesidad", "admirador", "encontrar", "obsequiar", "adoptar", "enfocar", "obsesionar", "adorar", "ensillar", "ocupar", "aerosol", "entrometer", "ofender", "afectar", "escolar", "oficial", "afinidad", "esconder", "oficiar", "alcanzar", "escribir", "ofrendar", "ampliar", "esencial", "orientador", "animar", "espiritual", "oriental", "animosidad", "establecer", "orinar", "aniquilar", "estipular", "patinar", "anticipar", "evadir", "percibir", "ascender", "expedir", "peritoneal", "asesinar", "explorar", "persuadir", "asesor", "facilitar", "plantar", "asiduidad", "favorecer", "policial", "atender", "febril", "prometer", "atrocidad", "financiar", "proseguir", "azuzar", "fragilidad", "pulidor", "balancear", "frivolidad", "purificar", "billar", "funcionar", "racional", "bimestral", "ganar", "racionar", "binocular", "garantizar", "real", "blanqueador", "generar", "rectangular", "blanquear", "generosidad", "regresar", "borrar", "genial", "rentar", "bostezar", "girar", "reptar", "boxear", "glacial", "rescatar", "brevedad", "glaciar", "ritual", "bronceador", "gladiador", "rumiar", "brutal", "gratitud", "saborear", "burbujear", "guardar", "sacar", "cabezal", "habitual", "sal", "caducidad", "habituar", "salir", "calentar", "hexagonal", "saludar", "cantar", "hostal", "salvador", "cantor", "hotel", "sanear", "capacidad", "humedecer", "santidad", "causal", "hundir", "santiguar", "cavidad", "implicar", "separar", "cazar", "importar", "simpatizar", "cañaveral", "humedad", "sanidad", "central", "incondicional", "sobrenatural", "cepillar", "inferior", "soldar", "colocar", "infiltrar", "sumar", "combatir", "ingenuidad", "superior", "compensar", "inicial", "tejer", "competir", "inmoral", "timador", "compresor", "insinuar", "trabajar", "consolar", "integridad", "traer", "contener", "interior", "traicionar", "continental", "interpretar", "trasplantar", "contrariedad", "intrigar", "ungir", "contribuir", "jalar", "unidad", "corral", "jocosidad", "universal", "costillar", "judicial", "untar", "cruzar", "jugar", "urbanidad", "dejar", "jurar", "vecindad", "delinquir", "justificar", "ventilar", "denigrar", "laminar", "veracidad", "dental", "legitimidad", "verdad", "depositar", "lesionar", "vitorear", "desesperar", "luminosidad", "vivir", "desperdiciar", "maldecir", "abanderado", "cocinero", "mesa", "abandonado", "colcha", "mochila", "abanico", "colmillo", "muestra", "abarrotado", "mueve", "abarrotes", "comadreja", "nubes", "abasto", "come", "nublado", "abeja", "como", "ojos", "abortivo", "compra", "olas", "abrasivo", "computadora", "ombligo", "abrigo", "conjuro", "ordena", "absoluto", "consume", "organiza", "abuela", "corre", "oso", "abuelo", "corrige", "pantera", "acarreo", "corta", "para", "acondicionado", "cortinas", "parlante", "acuarela", "cuaderno", "pecas", "acuario", "cuadro", "peces", "acusado", "cuanto", "pecho", "administrativo", "cuchara", "pelo", "adorno", "cuchillo", "pera", "aduana", "cuello", "pera", "adulto", "cuenta", "perfume", "adulto", "desordena", "perro", "diente", "pestañas", "agua", "disco", "piedra", "aire", "domingo", "pierna", "alcantarilla", "elefante", "pintura", "alfombra", "piscis", "almacena", "empresa", "plancha", "almohada", "enchufe", "planeta", "amarillo", "planifica", "amazonas", "ensalada", "playa", "analiza", "escorpio", "pluma", "anonadada", "escribe", "pone", "antes", "espera", "anulares", "estadio", "puerto", "arena", "estima", "quien", "argentina", "estrellas", "rama", "arrecife", "estructura", "recibe", "asume", "estudia", "redacta", "atento", "estupefacta", "regla", "avispa", "eugenesia", "remera", "balanza", "eugenia", "resumen", "banana", "figura", "revisa", "flaca", "rinoceronte", "banco", "folio", "roca", "bandada", "fruta", "rompe", "bandido", "fuente", "ropa", "baño", "galaxias", "rosario", "banquero", "ganado", "saludo", "bota", "gases", "santo", "botana", "gato", "serio", "bote", "genio", "signos", "buena", "gordo", "silla", "bufanda", "guitarra", "sorprendida", "busca", "gusano", "suerte", "caballo", "hormigas", "superpone", "cabello", "ingenio", "surge", "cable", "intento", "tamarindo", "cachetes", "jirafa", "tapado", "cadera", "juega", "teclado", "calzado", "teclas", "cama", "jueves", "temperatura", "caminata", "jugo", "termo", "camisa", "ladrillo", "tetilla", "camiseta", "leche", "tierra", "libro", "tocadiscos", "campo", "limpieza", "toma", "capricornio", "llueve", "tonto", "cara", "lluvia", "trampa", "lunar", "trapo", "carmen", "lunes", "universo", "carpeta", "maestra", "vaca", "cejas", "mala", "vaso", "manda", "vende", "chaqueta", "manteca", "venga", "chile", "manzana", "viernes", "cielo", "martes", "volumen", "clavo", "martillo", "cloaca", "mate", "vuelo", "cocina", "media", "zapatillas", "cocina", "memorizar", "zapato"];
  indice = Math.floor(Math.random() * 481);
  palabra = this.tabla[this.indice];
  arrayp = this.palabra.split("");
  container;
  salida;
  solucion = [];
  fallos = 0;
  finalGanado = false;
  gameOver = false;
  won = 0;
  lost = 0;
  constructor(
    private juegoService:JuegoService,
    private jugadoresService:UserService
    ) { }

  ngOnInit(): void
  {

    this.container = document.getElementById("container");
    this.salida = document.getElementById("fallos");
    for (var i = 0; i < this.arrayp.length; i++)
    {
      this.solucion.push("-");
      this.container.innerHTML = this.solucion.join(" ");
    }
  }

  seleccionarLetra(letra: string, boton)
  {
    boton.path[0].disabled = true;
    var encontrado = this.palabra.indexOf(letra);
    if (encontrado != -1)
    {

      for (var j = 0; j < this.arrayp.length; j++)
      {
        if (this.arrayp[j] == letra)
        {
          this.solucion[j] = letra;
        }
        this.container.innerHTML = this.solucion.join(" ");
        var terminado = this.solucion.indexOf("-");
        if (terminado == -1)
        {
          this.container.innerHTML += "<br>GANASTE!!! ";
          this.gameOver = true;
          this.finalGanado = true;
        }
      }
      if (this.finalGanado)
      {
        this.won++;
        this.guardarJuego(true);
        this.finalGanado = false;
      }
    } else
    {
      this.fallos++;
      this.salida.innerHTML = "Con " + (6 - this.fallos) + " fallos serás ahorcado";
      if (this.fallos >= 6)
      {
        this.container.innerHTML = "PERDISTE !!!!! ";
        this.gameOver = true
        this.lost++;
        this.salida.innerHTML = '<div class="d-flex flex-column align-items-center"><div>La solución era: ' + this.palabra + '</div></div>';
        var teclado = document.getElementById('teclado');
        this.guardarJuego(false);
      }
    }
  }

  guardarJuego(gano:boolean){
    var juego = new JuegoAhorcado(this.jugadoresService.jugador);
    juego.gano = gano;
    this.juegoService.addJuego(juego).then(()=>{
      console.log("Guardado---")
    });
  }

  reiniciar()
  {
    this.gameOver = false;
    this.indice = Math.floor(Math.random() * 481);
    this.palabra = this.tabla[this.indice];
    this.arrayp = this.palabra.split("");
    this.solucion = [];
    this.fallos = 0;
    var teclado: HTMLDivElement = document.getElementById('teclado') as HTMLDivElement;
    for (var i = 0; i < this.arrayp.length; i++)
    {
      this.solucion.push("-");
      this.salida.innerHTML = "Con 6 fallos serás ahorcado";
      this.container.innerHTML = this.solucion.join(" ");
    }
    var botones = teclado.getElementsByTagName('button');
    for (var i = 0; i < botones.length; i++)
    {
      botones[i].disabled = false;
    }

  }

}


