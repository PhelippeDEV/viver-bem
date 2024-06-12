// Inicializa o mapa com a visão centralizada em Niterói
var map = L.map('map').setView([-22.887860, -43.111000], 14);

// Adiciona camada de mapa do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Array para armazenar os marcadores públicos
var publicMarkers = [];

// Função para adicionar os marcadores públicos ao mapa
function addPublicMarkers() {
    // Remove todos os marcadores do mapa
    publicMarkers.forEach(function(marker) {
        map.removeLayer(marker);
    });
    publicMarkers = [];

        // Array de órgãos públicos com suas coordenadas e imagens
    var orgaosPublicos = [
        { nome: '3º Grupamento de Bombeiro Militar', lat: -22.891711778186806, lng: -43.11418396424426, imagem: './static/img/legenda-vermelha.png' },
        { nome: 'Corpo de Bombeiros Charitas', lat: -22.933051069248233, lng: -43.09906769797954, imagem: './static/img/legenda-vermelha.png' },
        { nome: 'Corpo de Bombeiros de Itaipu 4 GMar', lat: -22.953566982714847, lng: -43.027985021671526, imagem: './static/img/legenda-vermelha.png' },
        { nome: '76ª Delegacia de Polícia', lat: -22.893408960453563, lng: -43.118037468830465, imagem: './static/img/legenda-preta.png' },
        { nome: '77ª DP - Delegacia Policial de Icaraí', lat: -22.908187790245876, lng: -43.10313126315783, imagem: './static/img/legenda-preta.png' },
        { nome: '78º Polícia Civil', lat: -22.88104292360981, lng: -43.10794487705151, imagem: './static/img/legenda-preta.png' },
        { nome: '79ª DP - Delegacia Policial de Jurujuba', lat: -22.933160531149614, lng: -43.09931299027052, imagem: './static/img/legenda-preta.png' },
        { nome: '81ª DP, Itaipú', lat: -22.96643067600031, lng: -43.04091835832669, imagem: './static/img/legenda-preta.png' },
        { nome: '12º Batalhão de Polícia Militar', lat: -22.885495044477196, lng: -43.11604851589526, imagem: './static/img/legenda-azul.png' },
        { nome: 'Defesa Civil Municipal de Niterói', lat: -22.892141702258044, lng: -43.11828445326347, imagem: './static/img/legenda-laranja.png' },
        { nome: 'Vigilância Sanitária', lat: -22.891175525011786, lng: -43.11898677624684, imagem: './static/img/legenda-verde.png' },
        { nome: 'Vigilância Sanitária', lat: -22.88426345687803, lng: -43.1268130700638, imagem: './static/img/legenda-verde.png' },
        { nome: 'PROCON Niterói', lat: -22.891910183231765, lng: -43.112075484259066, imagem: './static/img/legenda-roxa.png' }
    ];


    // Itera sobre cada órgão público para criar marcadores com ícones personalizados
    orgaosPublicos.forEach(function(orgao) {
        var customIcon = L.icon({
            iconUrl: orgao.imagem,
            iconSize: [24, 39], // Tamanho do ícone (largura, altura)
            iconAnchor: [12, 39], // Ponto de âncora do ícone (relativo ao seu tamanho)
        });

        var marker = L.marker([orgao.lat, orgao.lng], { icon: customIcon });

        // Adiciona um popup com informações adicionais ao clicar no marcador
        marker.bindPopup('<strong>' + orgao.nome + '</strong><br><a href="https://www.google.com/maps/search/?api=1&query=' + orgao.lat + ',' + orgao.lng + '" target="_blank">Ver no Google Maps</a>');

        publicMarkers.push(marker);
    });

    // Adiciona todos os marcadores ao mapa
    L.layerGroup(publicMarkers).addTo(map);
}

// Aguarda o carregamento do DOM para iniciar a função addPublicMarkers
$(document).ready(function() {
    addPublicMarkers();
});