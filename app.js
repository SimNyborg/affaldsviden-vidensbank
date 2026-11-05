// Vidensbankens logik, samme som i designforslaget
class Component extends DCLogic {
  constructor(props) {
    super(props);
    const p = props || {};
    this.state = {
      view: p.startDoc ? 'doc' : (p.startView === 'ask' || p.startView === 'doc' ? 'home' : (p.startView || 'home')), serie: p.startSerie || 'gebyr', tema: p.startTema || '',
      docId: p.startDoc || '', from: p.startDoc && p.startSerie ? { view: 'serie', serie: p.startSerie } : { view: 'home' },
      q: '', kq: '', variant: 'H', allUnits: false, allTemaer: false, narrowWin: false, menuOpen: false,
      aiOpen: p.startView === 'ask', aiAsked: p.startView === 'ask', aiQ: p.startView === 'ask' ? 'Hvad koster det at indsamle batterier?' : '',
      docAiId: '', docQ: '', docAsked: false,
      upFiles: [], upOrg: '', upTema: '', upDesc: '', upName: '', upMail: '', upShare: false, upSent: false, upError: '',
      fq: '', fTema: '', fOrg: '', fType: '', fYear: '', fSort: '', filtersOpen: false
    };
  }
  componentDidMount() {
    try {
      const check = () => this.setState({ narrowWin: window.innerWidth < 720 });
      check();
      window.addEventListener('resize', check);
    } catch (e) {}
  }
  renderVals() {
    const DATA = {"gb":{"Albertslund":"12111111111111","Allerød":"1111111-112111","Assens":"11111111111211","Ballerup":"11111111111211","Billund":"11111111112212","Bornholm":"11111111111311","Brøndby":"11111111111111","Brønderslev":"111111--111412","Dragør":"1111111-112111","Egedal":"111111111-1-11","Esbjerg":"11111111111312","Fanø":"11111111112411","Favrskov":"11211111112312","Faxe":"11111111111111","Fredensborg":"11111111112111","Fredericia":"11112111111411","Frederiksberg":"-1111-11111111","Frederikshavn":"11111111111413","Frederikssund":"21212111111111","Furesø":"11111111112111","Faaborg-Midtfyn":"11111111111411","Gentofte":"11111121212111","Gladsaxe":"11111211111111","Glostrup":"11111111111111","Greve":"211-1-1-112211","Gribskov":"11111111111221","Guldborgsund":"131-1111111111","Haderslev":"11111111111112","Halsnæs":"12112211112111","Hedensted":"11111-11112313","Helsingør":"11111111111312","Herlev":"11111111111111","Herning":"11111111111312","Hillerød":"11111111111111","Hjørring":"11111-11111313","Holbæk":"11311131313233","Holstebro":"11111111111211","Horsens":"53111111111311","Hvidovre":"11111111112111","Høje-Taastrup":"11111211111111","Hørsholm":"11111111111111","Ikast-Brande":"21111111111111","Ishøj":"11111111111111","Jammerbugt":"11111111111312","Kalundborg":"11111111111111","Kerteminde":"11111111111412","Kolding":"11111111111311","København":"11111111112111","Køge":"11111111111111","Langeland":"11111111111312","Lejre":"11111111111111","Lemvig":"11111111111211","Lolland":"13121111111111","Lyngby-Taarbæk":"11111111112111","Læsø":"11111111111111","Mariagerfjord":"12111111111311","Middelfart":"13211111116233","Morsø":"11111111211413","Norddjurs":"12111111222312","Nordfyn":"11111121215312","Nyborg":"11111111111412","Næstved":"11111111111111","Odder":"42114-41111112","Odense":"22111112515443","Odsherred":"11111121111411","Randers":"11111111111412","Rebild":"11111111111312","Ringkøbing-Skjern":"11111121113212","Ringsted":"11111122113111","Roskilde":"11211121111111","Rudersdal":"11111112111112","Rødovre":"11111111111111","Samsø":"11111111111212","Silkeborg":"12111111111313","Skanderborg":"42114-11111112","Skive":"11111111111211","Slagelse":"11111111111111","Solrød":"12111111111111","Sorø":"11111111111111","Stevns":"11111111111111","Struer":"11111111111311","Svendborg":"11111111111211","Syddjurs":"12111111212312","Sønderborg":"11111111112112","Thisted":"21111112111-11","Tønder":"11111111111213","Tårnby":"11111111112111","Vallensbæk":"11111111111111","Varde":"11111111111111","Vejen":"11111111111311","Vejle":"32111131313232","Vesthimmerland":"11111111111211","Viborg":"12111111111111","Vordingborg":"11111111112111","Ærø":"1111111-1-2212","Aabenraa":"1111111L1L1111","Aalborg":"17111124111412","Aarhus":"11111131112312"},"reg":{"Albertslund":[["10.12.2024","18.04.2023","14.12.2021","06.10.2015"],[],["24.11.2025"],["06.10.2015"]],"Allerød":[["10.10.2023"],[],["10.10.2023"],[]],"Assens":[["18.12.2025"],[],["29.11.2023"],[]],"Ballerup":[["19.06.2023","09.01.2018"],[],["09.01.2018"],[]],"Billund":[["25.02.2025","21.02.2023"],["26.02.2019","22.02.2022"],["25.02.2025"],["07.05.2019","22.02.2022","21.02.2023"]],"Bornholm":[["25.06.2026","10.10.2024"],[],["19.09.2024"],["25.11.2010"]],"Brøndby":[["18.05.2022"],[],["23.11.2022"],[]],"Brønderslev":[["05.09.2018"],[],["26.02.2025","05.09.2018"],[]],"Dragør":[["31.03.2022"],[],["22.06.2023","29.03.2012"],[]],"Egedal":[["01.07.2024"],[],["26.03.2025"],[]],"Esbjerg":[["21.02.2025"],[],["21.03.2025"],[]],"Fanø":[["29.02.2024"],[],["18.05.2015"],[]],"Favrskov":[["18.12.2023","27.11.2012"],[],["27.11.2024","08.11.2012"],["18.12.2023"]],"Faxe":[["14.01.2025","16.08.2022"],["12.11.2024"],["08.02.2023","02.05.2019"],["17.11.2012"]],"Fredensborg":[["12.06.2025"],[],["25.09.2023"],[]],"Fredericia":[["18.12.2023","21.12.2022","05.12.2011"],["17.05.2021","21.12.2022"],["18.12.2023","06.12.2011"],[]],"Frederiksberg":[["27.04.2026"],[],["02.03.2026","03.10.2022"],[]],"Frederikshavn":[["24.11.2021"],["21.03.2018"],["21.03.2018"],[]],"Frederikssund":[["28.02.2024","24.06.2021","27.03.2019"],["09.03.2017"],["29.09.2010"],[]],"Furesø":[["29.06.2022"],[],["19.12.2018"],[]],"Faaborg-Midtfyn":[["09.01.2026","19.01.2022","13.09.2011"],[],["14.08.2012"],[]],"Gentofte":[["27.11.2023","08.02.2022","18.05.2021"],[],["27.11.2023","02.04.2013"],[]],"Gladsaxe":[["28.09.2022"],[],["27.09.2023","27.03.2019","11.10.2012"],[]],"Glostrup":[["09.05.2025","23.03.2022","10.02.2016"],[],["14.03.2012"],[]],"Greve":[["16.11.2023"],[],["15.01.2024","04.12.2014"],[]],"Gribskov":[["05.09.2023","02.09.2013"],[],["05.09.2023","02.09.2013"],[]],"Guldborgsund":[["21.06.2022","17.05.2021","19.03.2018"],[],["21.06.2022","17.05.2021","19.03.2018"],[]],"Haderslev":[["16.12.2025"],[],["16.12.2025"],[]],"Halsnæs":[["22.06.2023","25.11.2014"],[],["25.11.2014"],[]],"Hedensted":[["03.12.2025","29.03.2023","23.02.2022","26.06.2013"],[],["03.12.2025","12.11.2024","29.03.2023"],["26.06.2013"]],"Helsingør":[["25.06.2025"],[],["25.06.2025"],[]],"Herlev":[["15.05.2023"],[],["17.06.2022"],["09.06.2016"]],"Herning":[["08.07.2022"],[],["17.12.2024"],[]],"Hillerød":[["27.04.2022"],[],["27.04.2022","26.06.2012"],[]],"Hjørring":[["28.03.2023","13.06.2018"],["15.03.2022"],["28.03.2023","30.04.2013"],[]],"Holbæk":[["17.06.2026"],[],["17.06.2026"],[]],"Holstebro":[["21.01.2025"],["20.08.2019","16.08.2022"],["20.01.2025"],["19.02.2013","20.08.2019","16.08.2022"]],"Horsens":[["26.05.2026"],[],["26.05.2026"],[]],"Hvidovre":[["24.02.2026","28.01.2025","27.02.2024","14.03.2022"],[],["28.01.2025","28.02.2023","14.03.2022","25.10.2016"],[]],"Høje-Taastrup":[["13.12.2011"],[],["17.12.2019"],["13.12.2011"]],"Hørsholm":[["31.03.2025"],[],["30.10.2023","24.09.2018"],[]],"Ikast-Brande":[["05.02.2024"],[],["16.12.2024","19.12.2022","08.10.2012"],[]],"Ishøj":[["05.04.2016"],[],["07.05.2019"],["05.04.2016"]],"Jammerbugt":[["27.02.2025"],[],["17.11.2016"],[]],"Kalundborg":[["29.11.2023","14.12.2022","16.09.2020"],["26.08.2015"],["29.11.2023","14.12.2022","16.09.2020","27.04.2016"],[]],"Kerteminde":[["27.02.2025","18.09.2023","28.02.2019"],["23.06.2022"],["27.02.2025","18.09.2023","28.02.2019"],["23.06.2022"]],"Kolding":[["23.09.2025","28.03.2023","24.04.2018"],[],["23.09.2025","17.12.2024","28.03.2023","24.04.2018"],[]],"København":[["18.06.2026","24.08.2023"],[],["18.06.2026","22.08.2024"],[]],"Køge":[["01.09.2026"],[],["28.02.2023"],[]],"Langeland":[["18.12.2023"],[],["18.12.2023"],["08.12.2014"]],"Lejre":[["28.02.2022","04.05.2020","18.12.2017"],[],["29.09.2016"],[]],"Lemvig":[["29.01.2025"],["14.12.2011","28.08.2019","08.08.2022"],["29.01.2025"],["28.01.2013","28.08.2019","08.08.2022"]],"Lolland":[["15.12.2022","02.06.2021","07.03.2018"],[],["15.12.2022","02.06.2021","07.03.2018"],[]],"Lyngby-Taarbæk":[["23.11.2023"],[],["23.11.2023","19.12.2013"],["03.10.2019","01.09.2022"]],"Læsø":[["31.08.2026","14.10.2024"],[],["31.08.2026"],["29.10.2018","14.10.2024"]],"Mariagerfjord":[["13.08.2026","24.11.2022","07.05.2018"],["01.10.2024"],["13.08.2026","01.10.2024","24.11.2022","11.03.2019"],[]],"Middelfart":[["23.06.2025","03.10.2022","03.09.2018"],["06.11.2023","05.02.2024"],["23.06.2025"],[]],"Morsø":[["25.03.2025","31.08.2015"],[],["25.03.2025","30.04.2024","31.08.2015"],[]],"Norddjurs":[["18.04.2023"],[],["18.04.2023"],[]],"Nordfyn":[["05.02.2026"],[],["23.07.2026"],[]],"Nyborg":[["31.01.2023","23.02.2021"],[],["31.01.2023"],["14.12.2010"]],"Næstved":[["16.09.2025"],["01.10.2018"],["16.09.2025"],["18.09.2018","29.06.2021"]],"Odder":[["18.12.2024"],[],["18.12.2024"],[]],"Odense":[["21.06.2023","12.12.2018"],[],["03.05.2023","12.12.2018"],[]],"Odsherred":[["29.04.2025"],[],["26.02.2013"],[]],"Randers":[["01.01.2026","25.05.2021"],["09.11.2020","26.08.2024"],["01.01.2026","28.08.2023","08.08.2015"],[]],"Rebild":[["25.01.2023"],[],["21.09.2017"],[]],"Ringkøbing-Skjern":[["08.10.2025","18.06.2024","20.06.2023","13.09.2022"],[],["08.10.2025","18.06.2024","20.06.2023","12.10.2021"],[]],"Ringsted":[["11.09.2023"],[],["11.09.2023","07.09.2020","18.04.2012"],[]],"Roskilde":[["27.10.2021"],[],["21.06.2023","29.03.2017"],[]],"Rudersdal":[["26.03.2025","15.12.2021"],["25.10.2023"],["25.10.2023","29.08.2018"],["20.11.2019","29.04.2020"]],"Rødovre":[["31.01.2024"],[],["26.10.2021"],[]],"Samsø":[["22.06.2021"],[],["26.01.2021","10.05.2011"],[]],"Silkeborg":[["05.03.2025"],[],["05.03.2025"],[]],"Skanderborg":[["18.12.2024"],[],["18.12.2024"],[]],"Skive":[["05.11.2024"],[],["05.11.2024"],[]],"Slagelse":[["24.03.2025","28.08.2017"],[],["26.05.2025","29.04.2024","30.04.2018"],[]],"Solrød":[["17.08.2023"],[],[],[]],"Sorø":[["10.02.2025"],[],["18.07.2025","20.09.2023","28.02.2018"],[]],"Stevns":[["25.06.2024","31.03.2022","30.04.2019","03.01.2011"],[],["16.11.2023","27.12.2011"],[]],"Struer":[["10.01.2025"],[],["10.01.2025"],[]],"Svendborg":[["29.08.2023","29.06.2021","31.03.2020"],["20.12.2016"],["20.12.2016"],[]],"Syddjurs":[["29.03.2023"],[],["29.03.2023"],[]],"Sønderborg":[["05.02.2025"],[],["05.02.2025"],[]],"Thisted":[["25.02.2025"],[],["25.02.2025"],["29.11.2022"]],"Tønder":[["06.12.2022","08.02.2022","10.03.2020"],["08.06.2015"],["06.12.2022","14.12.2016"],["10.03.2020"]],"Tårnby":[["25.08.2022","14.01.2014"],[],["23.02.2023","19.03.2013"],[]],"Vallensbæk":[["14.09.2022","17.02.2016"],[],["16.12.2026","17.02.2016"],[]],"Varde":[["03.09.2024","07.02.2023","14.01.2020","29.05.2012"],[],["03.06.2025","07.02.2023","30.11.2021","29.05.2012"],[]],"Vejen":[["26.08.2025"],["15.12.2022"],["26.08.2025"],["04.06.2012","14.09.2021","13.12.2022"]],"Vejle":[["28.10.2026","14.12.2022"],["13.09.2017"],["27.08.2025","16.03.2016"],["14.12.2022"]],"Vesthimmerland":[["10.08.2026"],[],["10.08.2026"],[]],"Viborg":[["26.02.2025"],[],["26.02.2025"],[]],"Vordingborg":[["26.02.2025"],["27.04.2017","21.04.2021","23.05.2022"],["26.02.2025"],[]],"Ærø":[["23.03.2022"],["29.08.2018"],["19.04.2023"],["12.12.2012"]],"Aabenraa":[["03.12.2025","07.11.2018"],[],["24.06.2020"],["19.09.2012"]],"Aalborg":[["15.04.2024"],[],["15.04.2024","13.11.2023","14.11.2022","22.11.2021"],[]],"Aarhus":[["07.06.2023","02.12.2020","09.11.2016"],[],["07.06.2023","02.12.2020","13.11.2019"],["09.11.2016"]]},"plan":{"Albertslund":["2005-2016 og 2005-2008","2013-2018","i vidensbanken"],"Allerød":["fundet","fundet","i vidensbanken"],"Assens":["","2020-2032","fundet"],"Ballerup":["2010-2012","i vidensbanken",""],"Billund":["","i vidensbanken","Affaldsplan 2021-2033"],"Bornholm":["2009-2012","2014-2018","Affaldsplan 2022-2034"],"Brøndby":["","i vidensbanken","Ressource- og affaldsplan 2022-2033"],"Brønderslev":["2005-2008","2014-2018",""],"Dragør":["","i vidensbanken","Affaldsplan 2023-2034"],"Egedal":["","2013-2024","i vidensbanken"],"Esbjerg":["2009-2012","2014-2018","Affaldsplan 2023-2028"],"Fanø":["","2017-2022","Affaldsplan 2023-2028"],"Favrskov":["","2013-2024","i vidensbanken"],"Faxe":["","i vidensbanken","Affaldsplan 2021-2032"],"Fredensborg":["fundet","i vidensbanken","i vidensbanken"],"Fredericia":["2009-2020","i vidensbanken","Affaldsplan 2021-2033"],"Frederiksberg":["2005-2008","2014-2018","Ressource- og Affaldsstrategi 2032"],"Frederikshavn":["","2020-2026","fundet"],"Frederikssund":["","i vidensbanken","Affaldsplan 2021-2030"],"Furesø":["2009-2020","i vidensbanken","i vidensbanken"],"Faaborg-Midtfyn":["2009-2012","2015-2020",""],"Gentofte":["2009-2020","i vidensbanken","Affaldsplan 2021-2032"],"Gladsaxe":["","i vidensbanken","Genbrugs- og Genanvendelsesplan 2025-2036"],"Glostrup":["2005-2016","","i vidensbanken"],"Greve":["2009-2020","2014-2024","Affaldsplan 2023-2034"],"Gribskov":["","2019-2030 og 2014-2025","Tillæg til affaldsplan 2025-2027"],"Guldborgsund":["","i vidensbanken",""],"Haderslev":["2009-2020","fundet (link)","Affaldsplan 2022-2033"],"Halsnæs":["","2013-2024","i vidensbanken"],"Hedensted":["","2014-2018 og 2014-2024","i vidensbanken"],"Helsingør":["fundet","i vidensbanken","Plan for cirkulær økonomi - fra affald til ressourcer 2023-2…"],"Herlev":["","i vidensbanken","Affaldsplan 2022-2033"],"Herning":["2005-2016","2015-2024","i vidensbanken"],"Hillerød":["2005-2016","i vidensbanken","Ressource- og Affaldsplan 2022-2032"],"Hjørring":["2005-2008","","Fra Affald til Cirkulær Økonomi. Affaldsplan 2022-2028"],"Holbæk":["","2014-2019","Affaldsplan for Holbæk Kommune 2021-2032"],"Holstebro":["","i vidensbanken","Affalds- og ressourceplan 2022-2034"],"Horsens":["2009-2020","2013-2024","i vidensbanken"],"Hvidovre":["2005-2016","i vidensbanken","Ressource- og Affaldsplan 2022-2033"],"Høje-Taastrup":["2005-2016","i vidensbanken",""],"Hørsholm":["fundet","i vidensbanken","i vidensbanken"],"Ikast-Brande":["2009-2020","i vidensbanken","Affaldsplan 2021-2033"],"Ishøj":["2001-2012","2019-2030","fundet"],"Jammerbugt":["","i vidensbanken",""],"Kalundborg":["","i vidensbanken","Affaldsplan for Kalundborg Kommune 2023-2034"],"Kerteminde":["","i vidensbanken","Ressourceplan 2022-2034"],"Kolding":["","2014-2024","Affaldsplan 2025-2037"],"København":["2009-2012","fundet","Ressource- og Affaldsstrategi 2030"],"Køge":["","i vidensbanken","Affaldsplan Køge Kommune 2025-2036"],"Langeland":["","i vidensbanken","Affalds- og ressourceplan 2023-2034"],"Lejre":["","","Plan for forebyggelse og håndtering af affald i Lejre Kommun…"],"Lemvig":["","i vidensbanken","Affalds- og ressourceplan 2022-2034"],"Lolland":["","i vidensbanken",""],"Lyngby-Taarbæk":["2005-2016","2013-2024","i vidensbanken"],"Læsø":["2009-2012","2019-2024","Affaldsplan 2025-2030"],"Mariagerfjord":["","i vidensbanken","Ressource- og affaldsplan 2021-2026"],"Middelfart":["","","Ressourceplan for Middelfart Kommune 2022-2032"],"Morsø":["2001-2013","","Affaldsplan 2022-2033"],"Norddjurs":["2009-2020","2014-2024","i vidensbanken"],"Nordfyn":["","2014-2018","Affaldsplan 2021-2032"],"Nyborg":["","2015-2020",""],"Næstved":["","i vidensbanken","Affaldsplan 2021-2032"],"Odder":["2000-2012","2014-2018","En cirkulær fremtid. Affaldsplan 2023-2026"],"Odense":["2010-2020","i vidensbanken","Dit affald - vores ressource. Affaldsplan 2021-2032"],"Odsherred":["","2014-2019","i vidensbanken"],"Randers":["2005-2008","","Ressource- og affaldsplan 2027"],"Rebild":["2009-2020","i vidensbanken","Rebild Kommunes Affaldsplan 2022-26"],"Ringkøbing-Skjern":["","i vidensbanken","Affaldshåndteringsplan 2022-2034"],"Ringsted":["","2020-2032","fundet"],"Roskilde":["","i vidensbanken","Affalds- og ressourceplan 2025-2030"],"Rudersdal":["fundet","i vidensbanken","i vidensbanken"],"Rødovre":["2005-2016 og 2009-2020","i vidensbanken","Affaldsplan 2022-2033"],"Samsø":["2009-2012","2015-2024",""],"Silkeborg":["","i vidensbanken","Affalds- og Ressourceplan 2021-2026"],"Skanderborg":["2000-2012","2014-2018","En cirkulær fremtid. Affaldsplan 2023-2026"],"Skive":["","i vidensbanken","Affalds- og ressourceplan 2022-2034"],"Slagelse":["","i vidensbanken","Affaldsplan 2021-2032"],"Solrød":["","i vidensbanken","Affaldsplan for Solrød Kommune 2022-2034"],"Sorø":["","i vidensbanken","Affaldsplan for Sorø Kommune 2021-2033"],"Stevns":["2001-2012","fundet","i vidensbanken"],"Struer":["","i vidensbanken","Affalds- og ressourceplan 2022-2034"],"Svendborg":["","i vidensbanken","Sammen for en cirkulær økonomi. Affaldsplan 2023-2034"],"Syddjurs":["2009-2020","2014-2024","i vidensbanken"],"Sønderborg":["","","Affaldsplan 2025-2036"],"Thisted":["","","i vidensbanken"],"Tønder":["fundet","fundet (link)","i vidensbanken"],"Tårnby":["fundet (link)","2014-2018","Ressourceaffaldsplan 2027-2032 (høringsudgave)"],"Vallensbæk":["","","i vidensbanken"],"Varde":["","","Affaldsplan 2022-2034"],"Vejen":["","","i vidensbanken"],"Vejle":["","i vidensbanken","Affalds- og ressourceplan 2025-2037"],"Vesthimmerland":["","i vidensbanken","Affaldsplan 2023-2034"],"Viborg":["","2014-2019","Affaldshåndteringsplan 2021-2026"],"Vordingborg":["","i vidensbanken","Affaldsplan 2022-2032"],"Ærø":["","i vidensbanken","Affaldsplan 2023-2035"],"Aabenraa":["","i vidensbanken","Affaldsplan 2024-2035. Mål- og planlægningsdel"],"Aalborg":["2005-2016 og 2000-2012","","Affaldsplan 2026-2037"],"Aarhus":["","2015-2018","i vidensbanken"]},"ar":{"Mariagerfjord":["RR","RR","RR","RR","FR","FM"],"Aalborg Forsyning":["RM","RF","RF","RF","RF","RF"],"AffaldPlus":["FF","FF","FF","FL","FF","FF"],"ARC":["FL","FL","FL","FL","FL","FL"],"ARGO":["MM","MM","FA","FA","FA","LA"],"Arwos":["FM","FM","FM","FM","FM","FM"],"Assens Forsyning":["FM","FM","FM","FM","FM","FM"],"AVV":["MM","MM","RM","RM","RM","RM"],"BOFA":["RM","RF","RF","RF","RF","RM"],"DIN Forsyning":["FA","FA","FA","FA","FA","FA"],"Favrskov Forsyning":["FF","FM","FA","FM","FM","FM"],"Faxe Forsyning":["FM","FM","FF","FF","FF","FF"],"FFV Energi & Miljø":["FA","FA","FA","FA","FA","FA"],"Fors":["FM","FF","FF","FF","FF","FA"],"Fredensborg Forsyning":["FM","FM","FM","FM","FM","FM"],"Frederiksberg Forsyning":["RR","RR","RR","RR","RR","RR"],"Frederikshavn Forsyning":["FL","FL","FL","FL","FF","FF"],"Glostrup Forsyning":["FM","FM","FM","FM","FM","FM"],"Gribskov Forsyning":["RF","RF","RF","FF","FF","FF"],"Halsnæs Forsyning":["FM","FM","FM","FM","FM","FM"],"Hillerød Forsyning":["FA","FL","FL","FF","FF","FF"],"HTK Forsyning":["RM","RM","RM","RM","RM","FM"],"Kalundborg Forsyning":["RR","RR","RR","RR","RR","RR"],"Kerteminde Forsyning":["FA","FA","FA","FA","FA","FF"],"KLAR Forsyning":["FM","FM","FF","FF","FF","FM"],"Kredsløb":["FA","FA","FA","FA","FA","FA"],"Lyngby-Taarbæk Forsyning":["FF","FF","FL","FM","FM","FM"],"Middelfart Affald & Genbrug":["RR","RR","RR","RR","FM","FM"],"Nomi4s":["FM","FM","FM","FM","FM","FM"],"Nordværk":["MM","MM","MM","MF","MM","FA"],"Norfors":["MF","FF","FF","FF","FF","FF"],"Nyborg Forsyning & Service":["FF","FF","FF","FM","FM","FM"],"Odense Renovation":["FL","FF","FF","FF","FL","FL"],"Provas":["FM","FM","FM","FM","FM","FM"],"REFA":["MM","MM","MF","MF","MF","MF"],"Reno Djurs":["FF","FF","FF","FF","FF","FF"],"Renosyd":["FM","FM","FF","FF","FF","FA"],"Revas":["RM","RM","RM","RM","RM","RM"],"Silkeborg Forsyning":["FF","FF","FF","FF","FF","FF"],"SONFOR":["FM","FM","FM","FM","FM","FM"],"Thy Forsyning":["RR","RR","RR","RR","FM","FF"],"Tønder Forsyning":["FM","FM","FM","FM","FM","FM"],"Vand og Affald":["FF","FF","FF","FF","FF","FF"],"Vestforbrænding":["FA","FA","FA","FA","FA","FA"],"Vesthimmerlands Forsyning":["FM","FF","FF","FF","FF","FM"]}};
    const st = this.state;
    const narrow = !!this.props.compact || st.narrowWin;
    const ME = 'Odense';

    // Vidensdokumenter (eksempler fra indsamlingen). Resuméerne er lavet med AI og kortet til omtrent samme længde.
    const VIDEN = [
      { id: 'E157', title: 'Driftsrapport for genbrugsstationer 2025', org: 'Reno Djurs', year: 2026, type: 'Statistik', temaer: ['Genbrugspladser', 'Data, statistikker og nøgletal', 'Afsætning og behandling'], img: 'img/6d3acd8e2cb25d88eb53ca0a57cfa424.jpg', url: 'https://renodjurs.dk/sites/default/files/2026-06/Driftsrapport%20for%20genbrugsstationer%202025.pdf', res: 'Driften af ni genbrugsstationer på Djursland i 2025: mængder pr. fraktion og station, besøgstal, kg pr. besøg og hvor meget der går til genanvendelse, forbrænding og genbrug.', long: 'Driftsrapporten fra Reno Djurs for 2025 dækker de ni genbrugsstationer i Norddjurs og Syddjurs og er lavet efter vilkår i miljøgodkendelserne. Stationerne modtog 49.333 ton mod 54.987 ton i 2024, fordelt på 690.852 besøg med i gennemsnit 71 kg pr. besøg. Haveaffald var størst med 14.364 ton, fulgt af beton og tegl med 6.792 ton. Af affaldet gik 67 % til genanvendelse, 18 % til forbrænding, 8 % til deponering og 4 % til direkte genbrug, som skønnes til ca. 2.000 ton. Med ca. 55.800 betalende husstande og sommerhuse svarer det til ca. 884 kg og 12 besøg pr. enhed, og ifølge en brugerundersøgelse fra 2024 kommer ca. 96 % af affaldet fra private.' },
      { id: 'E165', title: 'Byens genbrug: serviceniveau for nærgenbrugsstationer 2026-2036', org: 'Københavns Kommune', year: 2026, type: 'Strategi', temaer: ['Genbrugspladser', 'Affaldsplaner/regulativer og strategi', 'Direkte genbrug'], img: 'img/64d72455cbbe6ffdf8b62601352f670a.jpg', url: 'https://www.kk.dk/sites/default/files/agenda/c70d2c0b-027c-452e-b1d2-29f35530ae99/53e4521f-cb53-4008-aa4e-062be726a165-bilag-2_0.pdf', res: 'Københavns plan for nærgenbrugsstationer frem til 2036 med et fast serviceniveau, fire typer stationer og principper for kort vej til genbrug og en stærkere genbrugskultur.', long: 'Besøgene på Københavns nærgenbrugsstationer er mere end fordoblet på tre år, og med denne plan fastlægger kommunen et serviceniveau frem til 2036. I dag betjener nogle stationer ca. 30.000 borgere og andre op til 80.000, og ikke alle bydele har en station. Fremover skal stationerne dække hele byen og hver betjene 20.000-40.000 indbyggere. Det ventes at kræve 12 nye stationer, 4-6 frem mod 2030 og 6-8 frem til 2036, i alt 26. Planen beskriver fire typologier, fra bygninger i byrum og stueetager til p-huse og midlertidige løsninger, og fire principper for genbrug, bl.a. kort vej til genbrug, fordi bekvemmelighed vejer tungest for københavnerne.' },
      { id: 'E158', title: 'Årsrapport Genbrugsservice 2025', org: 'Amager Ressourcecenter (ARC)', year: 2026, type: 'Statistik', temaer: ['Genbrugspladser', 'Data, statistikker og nøgletal', 'Direkte genbrug'], img: 'img/d4a4c5442127d36c799f31aa84f50bbf.jpg', url: 'https://a-r-c.dk/app/uploads/2026/06/Aarsrapport-Genbrugsservice-2025.pdf', res: 'ARC\'s rapport for genbrugspladser og nærgenbrugsstationer i 2025 med mængder pr. plads, besøgstal, behandling af affaldet og resultater for direkte genbrug.', long: 'ARC\'s årsrapport for Genbrugsservice gør status over 2025 på selskabets 10 genbrugspladser og nærgenbrugsstationerne i København. Pladserne modtog 92.830 ton affald, 3 % mere end året før, og havde 1.563.113 besøg. At besøgstallet steg 52 %, skyldes især nye kameraer, der også tæller gående og cyklister. 71 % af affaldet blev sendt til genanvendelse, men opgjort efter modtageanlæggenes faktiske behandling var genanvendelsen 46 %, blandt andet fordi betonen kun kan bruges som vejfyld. Direkte genbrug steg 21 % til 3.695 ton, mens affald til deponi faldt 30 %. Rapporten har mængder og besøgstal for hver plads.' },
      { id: 'E168', title: 'Afrapportering af pilotprojektet Genbrugsspotterne', org: 'Københavns Kommune', year: 2026, type: 'Evaluering', temaer: ['Direkte genbrug', 'Genbrugspladser', 'Analyser og undersøgelser'], img: 'img/b2ca4e5378682111c05cb16b65fd6852.jpg', url: 'https://www.kk.dk/sites/default/files/agenda/7b5b42e1-395a-468a-b8db-915ca1745e11/18e02d0f-7b32-4db7-a67a-04e3de7d46fd-bilag-9.pdf', res: 'Erfaringer fra et toårigt forsøg med genbrugsspottere på Københavns fem genbrugsstationer: hvad de samlede ind til genbrug, hvad borgerne syntes, og hvad kommunen anbefaler.', long: 'Københavns Kommune gør status på pilotprojektet Genbrugsspotterne, der i 2025-2026 har 5 fuldtids- og 10 deltidsansatte på de fem genbrugsstationer. Ordningen ligger hos ARC, og spotterne vejleder borgere og erhverv og samler ting ind til direkte genbrug. I 2025 blev der indsamlet 402 ton, og borgernes tilfredshed med at kunne aflevere til genbrug steg fra 2022 til 2025. Forvaltningen finder ordningen relativt dyr, men pengene godt givet ud, og indstiller fast drift fra 2027 med 6,15 mio. kr. om året. Det hæver affaldstaksten med 18,1 kr. årligt pr. gennemsnitlig husstand. Der ventes 590 ton i 2027 og 720 ton i 2030, i alt 2.665 ton i 2027-2030.' },
      { id: 'I273', title: 'Selvbetjente åbningstider på genbrugsstationerne', org: 'Reno Djurs', year: 2026, type: 'Notat', temaer: ['Genbrugspladser', 'Teknologi'], img: 'img/1f9c93695e464d2c6dde7547024f7534.jpg', url: 'https://renodjurs.dk/sites/default/files/2026-09/Bilag%2023_Selvbetjente%20%C3%A5bningstider%20p%C3%A5%20genbrugsstationerne.pdf', res: 'Reno Djurs\' erfaringer med selvbetjente åbningstider, hvor private og erhverv kan aflevere affald kl. 6-21 med nummerpladeaflæsning, og besøgstal fra 2023 og frem.', long: 'I et notat fra september 2026 gør Reno Djurs status over de selvbetjente åbningstider i Grenaa og Feldballe. Her kan private og erhverv aflevere affald alle dage kl. 6-21 uden for den bemandede tid med nummerpladeaflæsning og overvågning. Ordningen startede som forsøg i Feldballe i 2021 og blev siden udvidet til Grenaa. I Grenaa ligger 70 % af besøgene i den bemandede tid, i Feldballe 65 %. Erhverv står for ca. 1 % af besøgene, men bruger i stigende grad de selvbetjente timer. Nye anlæg til adgangskontrol og kameraer koster ca. 1 mio. kr. pr. plads plus ca. 40.000 kr. årligt, og der går ekstra personaletid til oprydning og gennemsyn af video.' },
      { id: 'A043', title: 'Kortlægning og affaldsanalyser for elektronikaffald (WEEE)', org: 'Miljøstyrelsen', year: 2026, type: 'Analyse', temaer: ['Analyser og undersøgelser', 'Udvidet producentansvar', 'Sorteringskvalitet'], img: 'img/10b40936d385f09ea0fa9fcb9bf3db8f.jpg', url: 'https://www2.mst.dk/Udgiv/publikationer/2026/04/978-87-7564-053-9.pdf', res: 'Hvor ender elektronikaffald i Danmark? Rapporten bygger på interviews på 16 genbrugspladser og analyser af fejlsorteret elektronik og beregner effekten af nye virkemidler.', long: 'COWI og JHN Processor har for Miljøstyrelsen undersøgt, hvorfor Danmark i ti år ikke har nået EU\'s mål for indsamling af elektronikaffald (WEEE). Grundlaget er interviews på 16 genbrugspladser, analyser af fejlsorteret WEEE og ADS-data. Den største, men usikre forklaring er solgt elektronik, der stadig er i brug, anslået til 86.000 ton i 2023. Samme år endte ca. 6.400 ton WEEE i genbrugspladsernes containere til jern og metal. Af seks virkemidler kan bedre data fra skrotpladser øge registreringen mest, med ca. 23.700 ton. Rapporten anbefaler et mål baseret på genereret WEEE, hvor der mangler 37.800 ton mod 64.200 ton med det nuværende mål.' },
      { id: 'M352', title: 'Black bag sorting at Forfar Recycling Centre', org: 'Zero Waste Scotland', year: 2026, type: 'Evaluering', temaer: ['Genbrugspladser', 'Sorteringskvalitet'], img: 'img/0fff26935a15eba40ecac7eeb1091288.jpg', url: 'https://cdn.zerowastescotland.org.uk/managed-downloads/mf-k5c6ao72-1791887701d', res: 'Skotsk forsøg, hvor borgerne skulle sortere sække med blandet affald på genbrugspladsen. Genanvendelsesprocenten lå 4,8 procentpoint højere end ventet, og restaffaldet blev renere.', long: 'Zero Waste Scotland og Angus Council lod fra november 2025 til marts 2026 borgerne på genbrugspladsen Forfar Recycling Centre selv sortere det genanvendelige fra deres sække med blandet restaffald. Pladsens genanvendelsesprocent blev 58,5 % mod 53,7 % i en kontrolgruppe, altså 4,8 procentpoint mere. I marts 2026 var 20,6 % af restaffaldet på Forfar genanvendeligt mod 40,8 % i snit på tre pladser i 2023. Udbredt til alle Angus\' pladser anslås tiltaget at spare 835 ton CO2e og 164.955 pund om året, før opstartsudgifter og ekstra personale. Rapporten anbefaler sortering på alle kommunens pladser, så affaldet ikke flytter til nabopladserne.' },
      { id: 'C085', title: 'Opgørelse af omkostninger til batteriindsamling', org: 'KL og Brancheforeningen Cirkulær', year: 2026, type: 'Notat', temaer: ['Økonomi', 'Udvidet producentansvar'], img: 'img/0b9043f1e956bda52424e4c57f1bc162.jpg', url: 'https://www.kl.dk/media/asvit340/opgoerelse-af-omkostninger-for-batterier.pdf', res: 'Sådan opgør kommunen sine omkostninger til batteriindsamling, når udgifterne er spredt på flere ordninger. Omkostningen pr. kg skal bruges i kontrakten med de kollektive ordninger.', long: 'Brancheforeningen Cirkulær forklarer, hvordan kommunen kan samle sine udgifter til batteriindsamling og finde en pris pr. kg, så kontrakten med de kollektive ordninger bliver omkostningsægte. Notatet bygger på batteriforordningen og Eunomias retningslinjer og gennemgår ordningerne fra miljøkasse og pose-på-låg til viceværtsordninger og genbrugspladser. I miljøkassen bør batteriernes andel opgøres efter tid eller antal frem for vægt, fordi batterier er tunge, men nemme at sortere. I et datasæt gav andelsmetoden 8 % batterier og vægtmetoden over 30 %. Niras anslog i 2024 omkostningen til 19 kr./kg i miljøkasse og 13 kr./kg i pose-på-låg.' },
      { id: 'E171', title: 'Evaluering af miljøstationer på Nørrebro', org: 'Københavns Kommune', year: 2026, type: 'Evaluering', temaer: ['Hente- og bringeordninger', 'Etageboliger', 'Økonomi'], img: 'img/b8fbdfad007345e7bd29905ca657ea9e.jpg', url: '#', res: 'Evaluering af tre miljøstationer på Nørrebro, der erstattede beholdere i gårdene. Driften koster 75 procent mere end gårdløsningen, og effekten på sorteringen er ikke entydig.', long: 'Københavns Kommune har evalueret et forsøg på Nørrebro, hvor tre miljøstationer med nedgravede beholdere på gaden afløste gårdenes 660-liters beholdere fra oktober 2024 til november 2025. Evalueringen bygger på vejninger, sorteringsanalyser, interviews og et spørgeskema. Driften koster 714.000 kr. om året mod 409.000 kr. før, især pga. dyrere vedligehold. Sorteringen blev hverken klart bedre eller dårligere. To tredjedele af beboerne har fået længere til affaldet, men på Tikøbgade vil 86 % beholde miljøstationen mod 43 % på Sjællandsgade. Forvaltningen indstiller, at ejendommene betaler gebyret for restaffald i private nedgravede beholdere.' },
      { id: 'A039', title: 'Affaldsfremskrivning 2025', org: 'Energistyrelsen', year: 2026, type: 'Analyse', temaer: ['Data, statistikker og nøgletal', 'Analyser og undersøgelser'], img: 'img/d2a4d95e55ff737f39a2c3d4545b33e6.jpg', url: 'https://mst.dk/media/jruicwky/affaldsfremskrivning-2025-ens.pdf', res: 'Energistyrelsens fremskrivning af den forventede udvikling i Danmarks affaldsmængder og behandling. Den bygger på affaldsmodellen i GrønREFORM med data til og med 2023.', long: 'Affaldsfremskrivning 2025 er Energistyrelsens første publicerede fremskrivning fra affaldsmodellen i GrønREFORM, som afløser FRIDA-modellen. Den bygger på Affaldsdatasystemet, Nationalregnskabet og affaldsanalyser med 2023 som seneste dataår og dækker 2024-2050. Mængderne fordeles på husholdnings- og erhvervsaffald, 17 fraktioner og fire behandlingsformer fra genanvendelse til deponering. Modellen skelner mellem indsamlet og reelt genanvendt affald, medregner effekten af vedtagne, men ikke gennemførte tiltag og fremskriver elektronikaffald også inkl. skyggestrømme. Rapporten beskriver metoden, mens tallene ligger i et Excel-bilag.' },
      { id: 'A041', title: 'Nøgletal til betaling for ikke-emballageaffald og erhvervsemballage', org: 'Energistyrelsen', year: 2026, type: 'Statistik', temaer: ['Udvidet producentansvar', 'Data, statistikker og nøgletal', 'Økonomi'], img: 'img/e2e966be181a36cc9e9dc8b80d111381.jpg', url: 'https://mst.dk/media/hc4lmbe0/noegletal-01_10_2026.pdf', res: 'Energistyrelsens nøgletal for kommunernes betaling til de kollektive ordninger for ikke-emballageaffald og for kompensation for erhvervsemballage, gældende fra 1. oktober 2026.', long: 'Energistyrelsens nøgletal bruges af de kollektive ordninger til betalingerne efter emballagebekendtgørelsens bilag 8 og 9. Kommunerne betaler ordningerne for husholdningernes ikke-emballageaffald, og ordningerne kompenserer virksomheder for erhvervsemballage. Versionen gælder fra 1. oktober 2026, og tallene prisreguleres hvert kvartal. For husholdninger er behandlingsnøgletallet 2.450 kr. pr. ton for plast og 1.005 kr. for mad- og drikkekartoner (MDK), mens pap og metal er negative. Transportnøgletallet er 24,53 kr. pr. km og timeprisen for administration 349,61 kr. På erhvervssiden er indsamling af MDK dyrest med 7.974 kr. pr. ton.' },
      { id: 'A042', title: 'Minimering af gasemissioner fra kompostering af haveaffald', org: 'Miljøstyrelsen', year: 2026, type: 'Rapport', temaer: ['Klima', 'Afsætning og behandling', 'Analyser og undersøgelser'], img: 'img/66dbb984f13be0174f6fc28100867f1b.jpg', url: 'https://www2.mst.dk/Udgiv/publikationer/2026/07/978-87-7564-123-9.pdf', res: 'Forsøg på tre komposteringsanlæg viser, at milestørrelsen betyder mest for udledningen af metan. Små, passivt beluftede miler med usorteret haveaffald gav de laveste emissioner.', long: 'DTU Sustain og Haugsted Consult har for Miljøstyrelsen målt metan og lattergas fra 10 varianter af fuldskala-kompostering af haveaffald på tre anlæg. Milestørrelsen betød mest, og 4,5 m høje miler udledte markant mere metan end 3 m høje, også pr. ton. Usorteret haveaffald modnede hurtigere og gav samlet mindre metan end sorteret, mens hyppigere vending og biocover ikke havde tydelig effekt. Små, passivt beluftede miler eller aktivt beluftede moduler med usorteret affald kan sænke metanudledningen ca. 68 % i forhold til den nationale emissionsfaktor, fra 2,57 til ca. 0,8 kg pr. ton. Lattergas lå i alle forsøg langt under den nationale faktor.' },
      { id: 'AA553', title: 'Emballageforbrug til madlevering og skolemad', org: 'Miljøstyrelsen', year: 2026, type: 'Analyse', temaer: ['Cirkulær økonomi', 'Analyser og undersøgelser', 'Udvidet producentansvar'], img: 'img/080925b64fc1b212b4ab9bf3c35cc902.jpg', url: 'https://www2.mst.dk/Udgiv/publikationer/2026/07/978-87-7564-122-2.pdf', res: 'Emballageforbruget til madlevering og skolemad, opgjort for 2018 og fremskrevet til 2040, og en beregning af, hvornår genbrugsemballage er bedre for miljøet end engangsemballage.', long: 'Norion Consult, Menon Economics og Om Affald har for Miljøstyrelsen opgjort emballagen til madlevering og skolemad og regnet på nationale krav om 10, 20 og 30 % genbrug. Analysen bygger på interviews med ca. 50 aktører og affaldstal fra BEA-modellen. Forbruget var ca. 650 ton i 2018 og kan nå knap 1.500 ton i 2040 med flere ældre og mere skolemad. Genbrugsemballage skal bruges 6-15 gange for at slå engangsemballage på klima, og 10-30 % genbrug kan spare 51-140 ton affald i 2030. Nettonutidsværdien er -11 til -17 mio. kr. for madlevering og -4 til -5 mio. kr. for skolemad, og et generelt krav vurderes ikke samfundsøkonomisk fordelagtigt.' },
      { id: 'C090', title: 'Procedure for tildelingsordning: Emballage', org: 'Dansk Producentansvar', year: 2026, type: 'Vejledning', temaer: ['Udvidet producentansvar', 'Lovgivning og afgørelser'], img: 'img/73cc75e9f0e5a5294f9a55c4f8e11549.jpg', url: '#', res: 'Reglerne for, hvilken kollektiv ordning der skal afhente eller betale for emballageaffaldet i den enkelte kommune, og forskellen på tildeling med og uden overdragelse af affaldet.', long: 'Dansk Producentansvar beskriver, hvordan emballageaffald i hver kommune fordeles mellem de kollektive ordninger. Ved tildelingstype 1 overdrager kommunen husholdningernes emballageaffald til en ordning. Ved type 2 betaler ordningen kommunens indsamling uden at overtage affaldet, og for træemballage, emballage i restaffald og farligt affald også behandlingen. Type 3 er betaling til virksomheder for erhvervsemballage. Andelene bygger på markedsførte mængder og en tilbagetagningsfaktor, reguleret for over- og underindsamling. Hver fraktion tildeles for hele kommunen ud fra tre års gennemsnitlig indsamling, så flere ordninger kan dele en kommune.' },
      { id: 'B068', title: 'Udkast til emballagebekendtgørelsen med maksimale gebyrer', org: 'Miljøstyrelsen', year: 2026, type: 'Høringsudkast', temaer: ['Udvidet producentansvar', 'Lovgivning og afgørelser', 'Økonomi'], img: 'img/5bcc086c21a34fb9a8c5ad1535e0a8b5.jpg', url: '#', res: 'Udkastet sætter loft pr. ton over kommunernes gebyrer til producenterne for emballage fra henteordninger og kræver 20 % tillæg på gebyrerne fra oktober 2025 til april 2026.', long: 'Udkastet til ny emballagebekendtgørelse skal træde i kraft 1. juli 2026. Kommunernes gebyrer til producenterne for henteordninger med pap, papir, metal, glas, plast og mad- og drikkevarekartoner får et loft pr. ton, der afhænger af kommunegruppen. For plast er loftet 6.632 kr. i bykommuner, 7.725 kr. i oplandskommuner og 9.501 kr. i land- og ø-kommuner, for glas 2.547-2.908 kr. Gebyret beregnes som sidste års indsamlede tonnage gange emballageandelen, fx 51 % for plast, og det maksimale gebyr. Kommunerne skal også opkræve et tillæg på 20 % plus markedsrente af gebyrerne opkrævet fra oktober 2025 til april 2026, fordelt over fire år.' },
      { id: 'H223', title: 'Abonnementsordning for erhverv på genbrugspladserne', org: 'Nordfyns Kommune', year: 2025, type: 'Notat', temaer: ['Erhverv', 'Genbrugspladser', 'Økonomi'], img: 'img/953378baa500ec3ca0fbce8a76474ba4.jpg', url: 'https://dagsordener.nordfynskommune.dk/vis/pdf/bilag/9528fe7e-cd34-40a9-ac95-16316c6d554e', res: 'Nordfyns Kommune vurderer en abonnementsordning for virksomheder på genbrugspladserne efter skiftet til nummerpladescanning, med Kredsløbs ordning i Aarhus som eksempel.', long: 'Nordfyns Kommune har siden 2023 faktureret virksomheder og velgørende organisationer pr. besøg på genbrugspladserne via nummerpladescanning. Et notat fra april 2025 vurderer De Konservatives abonnementsforslag. Kredsløb i Aarhus tager 2.456-58.300 kr. årligt pr. P-nummer, men abonnenterne kommer 38 gange oftere end andre erhvervskunder, og Aarhus revurderer ordningen. En fast årlig pris gør det billigere for de største affaldsproducenter og dyrere for andre, og et ekstra system koster 40.000 kr. og 1.250 kr. månedligt. Loven tillader ikke at særbehandle velgørende organisationer, og administrationen foreslår en forundersøgelse til udgangen af 2026.' },
      { id: 'H252', title: 'Brugerundersøgelse af erhverv på genbrugspladserne i Brande og Ikast', org: 'Ikast-Brande Kommune', year: 2025, type: 'Analyse', temaer: ['Erhverv', 'Genbrugspladser', 'Økonomi'], img: 'img/1403c237972b5deb3d7b0802fa871699.jpg', url: 'https://dagsordener.ikast-brande.dk/vis/pdf/bilag/e84fad84-b590-4d34-b31d-842a96825500', res: 'Registrering af virksomheders besøg på genbrugspladserne i Brande og Ikast: besøg, læs, mængder og fraktioner som grundlag for kommunens gebyrer for erhverv fra 2026.', long: 'JHN Processor registrerede over syv hverdage i marts 2025 besøg og læs på genbrugspladserne i Brande og Ikast, så Ikast-Brande Kommune kan fastsætte gebyrer for erhverv i 2026. Af 1.657 registrerede besøg var 134 virksomheder. En virksomhed kom i gennemsnit med 316 kg affald mod 94 kg for en privat husstand, og håndværkere med abonnement havde 514 kg med. Opskaleret med kommunens tællertal på 178.461 besøg om året afleverer virksomhederne 5.544 ton årligt, heraf 1.674 ton blandet mursten og beton. Ifølge rapporten kan gennemsnitslæssene bruges til at prissætte transport og afsætning, mens fx personaleløn kan fordeles efter antal besøg.' },
      { id: 'I268', title: 'Tilfredshedsundersøgelse på genbrugsstationerne 2024', org: 'Reno Djurs', year: 2025, type: 'Analyse', temaer: ['Genbrugspladser', 'Analyser og undersøgelser'], img: 'img/d7d8b1923833b74d1cf5d252294efdcf.jpg', url: 'https://renodjurs.dk/sites/default/files/2025-03/Bilag%206.3_Tilfredshedsunders%C3%B8gelse%20genbrugsstationer.pdf', res: 'Spørgeundersøgelse blandt 1.523 kunder på otte genbrugsstationer om tilfredshed med stationerne, personalets vejledning og åbningstiderne, med resultater for hver station.', long: 'JHN Processor har for Reno Djurs målt kundetilfredsheden på otte genbrugsstationer. Interviewere delte spørgeskemaer ud på stationerne mellem 23. november og 3. december 2024, og 1.523 kunder svarede, heraf 64 virksomheder. 98 % er alt i alt tilfredse eller meget tilfredse, og lige så mange er tilfredse med personalet. Åbningstiden og ordenen i Gi\' det videre-området får de laveste scorer med 88 % hver. For åbningstiden går spændet fra 68 % i Ryomgård til 98 % i Feldballe, der også har åbent uden bemanding. I de 548 kunders kommentarer går ønskerne især på længere eller ubemandede åbningstider og nedsænkede containere til tunge fraktioner.' },
      { id: 'A037', title: 'Vejledende udtalelse om belægninger og overdækning ved oplag af elektronikaffald', org: 'Miljøstyrelsen', year: 2025, type: 'Vejledning', temaer: ['Lovgivning og afgørelser', 'Genbrugspladser'], img: 'img/1338bc86c91d80efe70671ca6dd0c472.jpg', url: 'https://mst.dk/media/1orn2qpi/vejledende-udtalelse-om-belaegninger-og-overdaekning-af-elektronikaffald.pdf', res: 'Miljøstyrelsen vurderer, at udækket elektronikaffald udvasker problematiske stoffer. Kommunerne bør bruge den viden, når de vurderer krav om tæt belægning og overdækning.', long: 'Miljøstyrelsens vejledende udtalelse fra november 2025 giver kommunerne viden om udvaskning fra udækket elektronikaffald. Elektronikaffaldsbekendtgørelsens § 40 kræver tæt belægning og overdækning af relevante arealer, men definerer dem ikke, så kommunen har et skøn. Grundlaget er en rapport fra 2023 med udvaskningstest af udstyr til temperaturudveksling, skærme og småt udstyr. Udvaskning af bl.a. bly, cadmium, kobber og PFAS kan være problematisk ved udledning til vandmiljø eller kloak. Stort udstyr og solceller blev ikke testet, men kan også udvaske stoffer. Kommunerne bør bruge den viden, når de i tilsynet vurderer, hvilke arealer der er relevante.' },
      { id: 'M346', title: 'Household Waste Recycling Centre (HWRC) Guide', org: 'WRAP', year: 2025, type: 'Vejledning', temaer: ['Genbrugspladser', 'Direkte genbrug', 'Kommunikation'], img: 'img/6af2186942bc940a1f079652319302ed.jpg', url: 'https://www.wrap.ngo/sites/default/files/2026-06/WRAP-HWRC-REPORT-v2.pdf', res: 'WRAP\'s samlede vejledning om genbrugspladser: indretning, booking, direkte genbrug, skiltning, måling af resultater og modtagelse af affald fra små virksomheder.', long: 'WRAP samler i en vejledning fra marts 2025 britisk god praksis for genbrugspladser, lavet med input fra kommuner og branchen. Den dækker lovgivning, måling af resultater, driftsmodeller, direkte genbrug, booking, affald fra små virksomheder, skiltning og indretning. I England faldt mængden på pladserne med 23 % fra 5,1 mio. ton i 2016/17 til 3,9 mio. ton i 2022/23. Flere medarbejdere, flere fraktioner, organiseret genbrug og tydelig skiltning følger med højere genanvendelse. Da Vale of Glamorgan i 2019 begyndte at afvise usorterede sække, faldt restaffaldet med ca. 60 % på fem måneder, og på én plads steg genanvendelsen fra 69 % til 84 %.' },
      { id: 'NIR', title: 'Omkostninger ved indsamling af bærbare batterier', org: 'KL, udarbejdet af NIRAS', year: 2024, type: 'Analyse', temaer: ['Økonomi', 'Udvidet producentansvar', 'Hente- og bringeordninger'], img: '', url: 'https://www.kl.dk/media/bltjw21y/rapport-omkostninger-ved-indsamling-af-baerbare-batterier-okt-2024.pdf', res: 'NIRAS beregner for KL, hvad kommunerne bruger på at indsamle bærbare batterier, i kr. pr. kg for hver ordning. Baggrunden er EU\'s batteriforordning og det nye producentansvar.', long: 'NIRAS har for KL beregnet, hvad det koster kommunerne at indsamle bærbare batterier fra husstande, nu hvor EU\'s batteriforordning kræver, at kommunal indsamling aftales med producenterne. Analysen bygger på interviews og spørgeskemaer med brugbare omkostningsdata fra 58 kommuner samt data fra DPA og ADS. Miljøkassen koster 19 kr./kg, pose-på-låg og andre ordninger 11-13 kr./kg og genbrugspladsen ca. 1 kr./kg. Med et gennemsnit på 11 kr./kg anslås udgifterne til 26-27 mio. kr. om året i 2021-2022, hvoraf producenternes betaling via DUT kun dækkede 67-69 %. Skal kommunerne alene nå EU-målene for 2027 og 2030, koster det 34-39 mio. kr. om året.' }
    ];
    // Én samlet temaliste lavet af vidensbankens nuværende kategorier og emner. De primære vises på forsiden, resten under "Se alle temaer".
    const TEMAER = [
      { name: 'Affaldsplaner/regulativer og strategi', desc: 'Planer og regulativer, som kommunen styrer affaldsområdet efter.', primary: true, serie: 'plan reg', from: ['Affaldsplaner/regulativer og strategi', 'Affaldsplaner', 'Strategier', 'Erhvervsregulativ'] },
      { name: 'Hente- og bringeordninger', desc: 'Indsamling ved boligen og ordninger, hvor borgeren selv afleverer.', primary: true, serie: '', from: ['Hente- og bringeordninger', 'Husholdninger', 'Køkkenkurv'] },
      { name: 'Genbrugspladser', desc: 'Drift og indretning af genbrugspladser og nærgenbrugsstationer.', primary: true, serie: '', from: ['Genbrugspladser'] },
      { name: 'Kommunikation', desc: 'Kampagner til borgerne og undervisning af børn og unge om affald.', primary: true, serie: '', from: ['Kommunikation', 'Borgerinddragelse og adfærd', 'Børn og unge'] },
      { name: 'Sorteringskvalitet', desc: 'Hvor godt borgerne sorterer, og hvordan det bliver målt.', primary: true, serie: '', from: ['Sorteringskvalitet', 'sorteringsundersøgelse', 'Sorteringsundersøgelser'] },
      { name: 'Analyser og undersøgelser', desc: 'Undersøgelser og evalueringer af ordninger og affaldsmængder.', primary: true, serie: '', from: ['Analyser og undersøgelser', 'analyser', 'Tilfredshedsundersøgelser'] },
      { name: 'Data, statistikker og nøgletal', desc: 'Tal for affaldsmængder og genanvendelse i kommuner og selskaber.', primary: true, serie: 'aars', from: ['Data, statistikker og nøgletal', 'Affaldsdata og statistikker'] },
      { name: 'Økonomi', desc: 'Hvad ordningerne koster, og hvordan affaldsgebyrerne bliver fastsat.', primary: true, serie: 'gebyr', from: ['Økonomi', 'Affaldsgebyrer', 'Forsyningstilsynet'] },
      { name: 'Afsætning og behandling', desc: 'Hvor affaldet ender, og hvordan det bliver behandlet.', primary: false, serie: '', from: ['Afsætning og behandling'] },
      { name: 'Byggeaffald', desc: 'Affald fra byggeri og nedrivning, også fra private.', primary: false, serie: '', from: ['Byggeaffald'] },
      { name: 'Cirkulær økonomi', desc: 'Hvordan materialer kan holdes i brug længere og genanvendes.', primary: false, serie: '', from: ['Cirkulær økonomi', 'Bæredygtig indkøbning'] },
      { name: 'Direkte genbrug', desc: 'Ting, der bliver brugt igen i stedet for at blive til affald.', primary: false, serie: '', from: ['Direkte genbrug'] },
      { name: 'Erhverv', desc: 'Regler og ordninger for affald fra virksomheder.', primary: false, serie: '', from: ['Erhverv'] },
      { name: 'Etageboliger', desc: 'Indsamling og sortering i etageboliger og boligforeninger.', primary: false, serie: '', from: ['Etageboliger'] },
      { name: 'Haveboliger/parcelhuse', desc: 'Indsamling og sortering ved parcelhuse og andre haveboliger.', primary: false, serie: '', from: ['Haveboliger/parcelhuse'] },
      { name: 'Klima', desc: 'Udledning af drivhusgasser fra indsamling og behandling af affald.', primary: false, serie: 'esg', from: ['klima'] },
      { name: 'Ledelse', desc: 'Organisering, ledelse og arbejdsmiljø i kommuner og selskaber.', primary: false, serie: '', from: ['Ledelse', 'Selskabsgørelse', 'Arbejdsmiljø'] },
      { name: 'Lovgivning og afgørelser', desc: 'Regler for affaldsområdet og afgørelser fra myndighederne.', primary: false, serie: '', from: ['Lovgivning og afgørelser', 'Love, bekendtgørelser, vejledninger mm.'] },
      { name: 'Reel genanvendelse', desc: 'Hvor meget affald der reelt bliver genanvendt, og hvordan det måles.', primary: false, serie: '', from: ['Reel genanvendelse', 'Beregning af genanvendelse'] },
      { name: 'Sommerhuse og kolonihaver', desc: 'Affaldsordninger for sommerhuse og kolonihaver.', primary: false, serie: '', from: ['Sommerhuse og kolonihaver'] },
      { name: 'Sorteringsvejledninger', desc: 'Vejledninger og skilte, der viser borgerne, hvordan de skal sortere.', primary: false, serie: '', from: ['Sorteringsvejledninger', 'Skilte'] },
      { name: 'Storskraldsordning', desc: 'Ordninger for afhentning af storskrald ved boligen.', primary: false, serie: '', from: ['Storskraldsordning'] },
      { name: 'Teknologi', desc: 'Ny teknik og optimering af indsamling og drift.', primary: false, serie: '', from: ['Teknologi', 'Optimering'] },
      { name: 'Tekstil', desc: 'Indsamling og genbrug af tøj og andet tekstilaffald.', primary: false, serie: '', from: ['Tekstil'] },
      { name: 'Udbud og kravspecifikationer', desc: 'Udbud af affaldsopgaver og krav til leverandørerne.', primary: false, serie: '', from: ['Udbud og kravspecifikationer'] },
      { name: 'Udvidet producentansvar', desc: 'Hvad producentansvaret betyder for kommunens indsamling og økonomi.', primary: false, serie: '', from: ['Udvidet Producentansvar', 'Kollektive ordninger', 'Emballage'] }
    ];

    // Faste dokumenter. Resuméerne følger samme skabelon, så de er lige lange. short er navnet på forsidens felt.
    // Sorteringsvejledninger og udbud er temaer, så de står ikke også her.
    const SERIER = [
      { id: 'gebyr', name: 'Gebyrblade', desc: 'Takster for husholdninger og virksomheder, år for år.', long: 'Kommunernes gebyrblade for husholdninger og virksomheder, år for år.', unit: 'kommune', variant: true },
      { id: 'reg', name: 'Affaldsregulativer', desc: 'Kommunernes regler for husholdnings- og erhvervsaffald.', long: 'Kommunernes regulativer for husholdnings- og erhvervsaffald med vedtagelsesdato, nyeste først.', unit: 'kommune', variant: true },
      { id: 'plan', name: 'Affaldsplaner', desc: 'Kommunernes affaldsplaner, nyeste planperiode først.', long: 'Kommunernes affaldsplaner med den nyeste planperiode først.', unit: 'kommune' },
      { id: 'aars', name: 'Årsrapporter', desc: 'Affaldsselskabernes årsrapporter, år for år.', long: 'Affaldsselskabernes og forsyningernes årsrapporter, nyeste regnskabsår først.', unit: 'selskab' },
      { id: 'esg', name: 'ESG- og bæredygtighedsrapporter', short: 'ESG-rapporter', desc: 'Selskabernes rapporter om miljø, klima og ansvar.', long: 'Affaldsselskabernes ESG-, klima- og bæredygtighedsrapporter og grønne regnskaber.', unit: 'selskab' },
      { id: 'budget', name: 'Budgetter og takstbilag', short: 'Budget og takster', desc: 'Affaldsområdets budget og takstbilag, år for år.', long: 'Kommunernes budgetter og takstbilag for affaldsområdet.', unit: 'kommune', proposal: true }
    ];
    const vName = { H: 'husholdning', E: 'erhverv' };
    const serieDocs = (sid, k, v) => {
      const out = [];
      if (sid === 'gebyr') {
        const s = DATA.gb[k] || '';
        const ys = [];
        for (let i = 0; i < 7; i++) { const c = s[i * 2 + (v === 'H' ? 0 : 1)]; if (c && c !== '-' && c !== 'r') ys.push(2020 + i); }
        ys.reverse().forEach((y, i) => out.push({ id: 'gb|' + k + '|' + v + '|' + y, title: 'Gebyrblad ' + vName[v] + ' ' + y, coverTitle: 'Gebyrblad ' + vName[v], coverYear: String(y), org: k + ' Kommune', unit: k, year: y, cur: i === 0, status: i === 0 ? 'Nyeste udgave' : 'Tidligere udgave', short: String(y), url: '#',
          res: v === 'H' ? k + ' Kommunes takster for husholdningernes affaldsordninger i ' + y + ': grundgebyr, beholdere og tømning samt de øvrige ordninger, kommunen opkræver gebyr for.' : k + ' Kommunes takster for virksomheder i ' + y + ', fx for indsamling af erhvervsaffald og for adgang til genbrugspladserne. Viser, hvad en virksomhed betaler.' }));
      } else if (sid === 'reg') {
        const r = DATA.reg[k] || [[], [], [], []];
        const ds = v === 'H' ? r[0] : r[2];
        const nm = 'Regulativ for ' + (v === 'H' ? 'husholdningsaffald' : 'erhvervsaffald');
        const odense = k === 'Odense' && v === 'H';
        ds.forEach((d, i) => out.push({ id: 'rg|' + k + '|' + v + '|' + d, title: nm, coverTitle: nm, coverYear: 'Vedtaget ' + d, org: k + ' Kommune', unit: k, year: Number(d.slice(-4)), date: d, cur: i === 0, status: i === 0 ? 'Nyeste udgave' : 'Tidligere udgave', short: d,
          url: odense ? (d === '21.06.2023' ? 'https://nstar.ens.dk/Get.aspx?type=Regulation&documentId=2772' : 'https://nstar.ens.dk/Get.aspx?type=Regulation&documentId=1905') : '#',
          res: odense ? 'Odense Kommunes regler for husholdningsaffald med 18 ordninger, bl.a. madaffald, papir, plast, tekstil, farligt affald, storskrald og genbrugspladsen, og hvordan de skal bruges.'
            : v === 'H' ? k + ' Kommunes regler for husholdningsaffald: hvilke indsamlingsordninger der findes, hvordan affaldet skal sorteres, og hvordan genbrugspladserne må bruges.'
            : k + ' Kommunes regler for erhvervsaffald: hvilke ordninger virksomheder skal eller kan bruge, og hvordan affaldet skal sorteres og afleveres.' }));
      } else if (sid === 'plan') {
        const p = DATA.plan[k] || ['', '', ''];
        // Datafeltet kan være en titel, en periode eller en intern note ("fundet", "fundet (link)", "i vidensbanken"). Afkortede titler slutter med "…".
        const note = (t) => /^fundet/.test(t) || t === 'i vidensbanken';
        [[p[2], ''], [p[1], '2014-2024'], [p[0], 'Før 2013']].forEach(([t, gen], i) => {
          if (!t) return;
          t = String(t);
          const m = t.match(/(\d{4})-(\d{4})/);
          const y = t.match(/\b(19|20)\d{2}\b/);
          const short = m ? m[1] + '-' + m[2] : (gen || (y ? y[0] : 'Affaldsplan'));
          const clean = t.replace(/\s*\S*…$/, '').replace(/[\s,:–-]+$/, '');
          const title = note(t) ? (short === 'Affaldsplan' ? short : 'Affaldsplan ' + short.toLowerCase()) : (/^\d{4}-\d{4}/.test(t) ? 'Affaldsplan ' + t : clean);
          const first = out.length === 0;
          out.push({ id: 'ap|' + k + '|' + i, title, coverTitle: title, coverYear: m ? m[1] + '-' + m[2] : '', org: k + ' Kommune', unit: k, year: m ? Number(m[1]) : (y ? Number(y[0]) : 0), cur: first, status: first ? 'Nyeste udgave' : 'Tidligere udgave', short, url: '#',
            res: k + ' Kommunes affaldsplan med mål og indsatser for affaldshåndteringen i planperioden og en kortlægning af affaldsmængder, ordninger og anlæg i kommunen.' });
        });
      } else if (sid === 'aars' || sid === 'esg') {
        const a = DATA.ar[k] || [];
        const pos = sid === 'aars' ? 0 : 1;
        const t = sid === 'aars' ? 'Årsrapport' : 'ESG-rapport';
        let first = true;
        for (let i = a.length - 1; i >= 0; i--) {
          const c = a[i][pos];
          if (c !== 'F' && c !== 'L') continue;
          const y = 2020 + i;
          out.push({ id: (sid === 'aars' ? 'ar|' : 'es|') + k + '|' + y, title: t + ' ' + y, coverTitle: t, coverYear: String(y), org: k, unit: k, year: y, cur: first, status: first ? 'Nyeste' : 'Tidligere år', short: String(y), url: '#',
            res: sid === 'aars' ? k + 's årsrapport for ' + y + ' med ledelsesberetning, hoved- og nøgletal og regnskab. Viser selskabets økonomi, aktiviteter og resultater i året.' : k + 's rapport om miljø, klima og samfundsansvar for ' + y + ', fx energiforbrug, udledninger, arbejdsmiljø og selskabets mål på området.' });
          first = false;
        }
      }
      return out.map((d) => ({ ...d, sid, variant: v || '' }));
    };
    const findDoc = (id) => {
      if (!id) return null;
      const v = VIDEN.find((d) => d.id === id);
      if (v) return v;
      const [kind, k, x] = id.split('|');
      const sid = { gb: 'gebyr', rg: 'reg', ap: 'plan', ar: 'aars', es: 'esg' }[kind];
      return serieDocs(sid, k, kind === 'gb' || kind === 'rg' ? x : '').find((d) => d.id === id) || null;
    };

    const go = (patch) => () => this.setState({ docId: '', q: '', menuOpen: false, ...patch });
    // Husker hvor man kom fra, så brødkrummen kan føre tilbage, også til søgeresultaterne
    const openDoc = (d) => () => this.setState({ view: 'doc', docId: d.id, q: '', menuOpen: false,
      from: st.view === 'doc' ? st.from : st.q.trim() ? { view: 'search', q: st.q } : { view: st.view, serie: st.serie, tema: st.view === 'tema' ? listTitle : st.tema } });
    // Dokumentkort med forsiden i A4-format, så hele forsiden kan ses. På smalle skærme ligger forsiden til venstre for teksten.
    const coverSmall = (d) => 'display: block; aspect-ratio: 210 / 297; overflow: hidden; background: ' + (d.img ? '#F4F6F2' : '#E6F4EA') + '; '
      + (narrow ? 'flex: 0 0 104px; width: 104px; align-self: flex-start; border-right: 1px solid #DAE0E0;' : 'width: 100%; border-bottom: 1px solid #DAE0E0;');
    const listCard = 'display: flex; flex-direction: ' + (narrow ? 'row' : 'column') + '; padding: 0; border: 1px solid #DAE0E0; border-radius: 15px; overflow: hidden; background: #FFFFFF; text-align: left; cursor: pointer; font: inherit; color: inherit;';
    const listText = 'display: flex; flex-direction: column; gap: 6px; padding: ' + (narrow ? '10px 12px' : '12px 14px 14px') + '; flex: 1; min-width: 0;';
    // Kortet viser det korte resumé, 5 linjer på computer og 4 på mobil. Fast højde holder kortene i en række lige høje.
    const listRes = 'font-size: 14px; line-height: 1.45; color: #3D5246; ' + (narrow ? '' : 'min-height: 7.25em; ') + 'display: -webkit-box; -webkit-line-clamp: ' + (narrow ? 4 : 5) + '; -webkit-box-orient: vertical; overflow: hidden;';
    const fakeCover = 'display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: ' + (narrow ? '8px' : '14px 14px 16px') + '; box-sizing: border-box;';
    const fakeTitle = 'font-size: ' + (narrow ? '12px' : '17px') + '; font-weight: 700; line-height: 1.2; color: #0A602D;';
    const toRow = (d) => ({ ...d, img: d.img || '', noImg: !d.img, coverTitle: d.coverTitle || d.title, coverYear: d.coverYear || '', coverStyle: coverSmall(d),
      cardStyle: listCard, textStyle: listText, resStyle: listRes, fakeCoverStyle: fakeCover, fakeTitleStyle: fakeTitle,
      title: d.sid ? d.title + (d.sid === 'aars' || d.sid === 'esg' ? ', ' + d.org : ', ' + d.unit) : d.title,
      meta: d.sid ? d.org + ' · ' + (d.date ? 'vedtaget ' + d.date : d.status) : d.org + ' · ' + d.year + ' · ' + d.type, open: openDoc(d) });

    // Visning
    const q = st.q.trim().toLowerCase();
    let view = q ? 'search' : st.view;
    const serie = SERIER.find((s) => s.id === st.serie) || SERIER[0];
    const v = serie.variant ? st.variant : '';
    const kommuner = Object.keys(DATA.gb).sort((a, b) => a.localeCompare(b, 'da'));
    const selskaber = Object.keys(DATA.ar).sort((a, b) => a.localeCompare(b, 'da'));

    // Ét kort pr. kommune eller selskab: navnet og udgaverne som ens knapper, nyeste først
    let rows = [], hasMoreUnits = false, moreUnitsLabel = '';
    const emptyUnits = [];
    const chip = 'min-height: ' + (narrow ? '44px' : '36px') + '; padding: 0 12px; border-radius: 8px; cursor: pointer; font: 500 14px "Roboto", Arial, sans-serif; background: #FFFFFF; color: #0A602D; border: 1px solid #9CC9AA;';
    const chipLabel = (d) => d.sid === 'reg' ? d.date : d.sid === 'plan' ? d.short : String(d.year);
    let noUnitHit = false;
    if (view === 'serie' && !serie.proposal) {
      const units = serie.unit === 'selskab' ? selskaber : kommuner;
      const kq = st.kq.trim().toLowerCase();
      let list = units.filter((u) => !kq || u.toLowerCase().includes(kq));
      if (!kq && serie.unit === 'kommune') list = [ME, ...list.filter((u) => u !== ME)];
      const withDocs = [];
      list.forEach((u) => { const ds = serieDocs(serie.id, u, v); if (ds.length) withDocs.push([u, ds]); else emptyUnits.push(u); });
      const limit = st.allUnits || kq ? withDocs.length : (narrow ? 6 : 24);
      hasMoreUnits = withDocs.length > limit;
      moreUnitsLabel = 'Vis alle ' + withDocs.length + ' ' + (serie.unit === 'selskab' ? 'selskaber' : 'kommuner');
      rows = withDocs.slice(0, limit).map(([u, ds]) => {
        const mine = u === ME && serie.unit === 'kommune';
        return { unit: u, mine,
          cardStyle: 'display: flex; flex-direction: column; gap: 10px; padding: 14px 16px; border-radius: 15px; border: 1px solid ' + (mine ? '#9CC9AA' : '#DAE0E0') + '; background: ' + (mine ? '#E6F4EA' : '#FFFFFF') + ';',
          chips: ds.map((d) => ({ label: chipLabel(d), title: d.title + (d.date ? ', vedtaget ' + d.date : ''), open: openDoc(d), style: chip })) };
      });
      noUnitHit = !!kq && list.length === 0;
    }
    const noUnitText = 'Ingen ' + (serie.unit === 'selskab' ? 'selskaber' : 'kommuner') + ' matcher "' + st.kq.trim() + '".';
    const vWord = serie.variant ? (st.variant === 'H' ? 'husholdning' : 'erhverv') : '';
    const serieHeading = serie.name + (vWord ? ' · ' + vWord : '');
    const serieHint = { gebyr: 'Klik på et år for at åbne gebyrbladet. Det nyeste står først.', reg: 'Klik på en vedtagelsesdato for at åbne regulativet. Den nyeste står først.', plan: 'Klik på en planperiode for at åbne planen. Den nyeste står først.' }[serie.id] || 'Klik på et år for at åbne rapporten. Det nyeste står først.';

    let listTitle = '', listDesc = '', listDocs = [], seeAlso = [], listTemaer = [];
    // Filtrene nulstilles, når man går ind på en liste forfra, men ikke når man går tilbage via brødkrummen
    const FRESET = { fq: '', fTema: '', fOrg: '', fType: '', fYear: '', fSort: '', filtersOpen: false };
    const goTema = (name) => go({ view: 'tema', tema: name, ...FRESET });
    const goSerie = (sid) => go({ view: 'serie', serie: sid, kq: '', allUnits: false, variant: 'H' });
    if (view === 'tema') {
      const t = TEMAER.find((x) => x.name === st.tema) || TEMAER[0];
      listTitle = t.name; listDesc = t.desc;
      listDocs = VIDEN.filter((d) => d.temaer.includes(t.name));
      seeAlso = (t.serie || '').split(' ').map((id) => SERIER.find((x) => x.id === id && !x.proposal)).filter(Boolean)
        .map((s, i) => ({ name: s.name, pre: i ? ' og ' : '', go: goSerie(s.id) }));
    } else if (view === 'alle') {
      listTitle = 'Alle dokumenter'; listDesc = 'Rapporter, analyser og vejledninger med de nyeste først. Gebyrblade, regulativer og planer finder du under Faste dokumenter.';
      listDocs = VIDEN.slice();
    } else if (view === 'search') {
      // Alle ord skal passe. Ord, der passer på en kommune eller et selskab, finder deres faste dokumenter,
      // og resten af ordene kan vælge dokumenttypen, fx "gebyrblad odense".
      listTitle = 'Søgeresultater'; listDesc = '';
      const words = q.split(/\s+/).filter(Boolean);
      const hit = (text) => words.every((w) => text.toLowerCase().includes(w));
      const units = kommuner.map((n) => [n, 'kommune']).concat(selskaber.map((n) => [n, 'selskab']));
      const unitHits = units.filter(([n]) => words.some((w) => n.toLowerCase().includes(w)));
      const rest = words.filter((w) => !unitHits.some(([n]) => n.toLowerCase().includes(w)));
      const serieHits = rest.length ? SERIER.filter((s) => !s.proposal && rest.every((w) => (s.name + ' ' + s.desc).toLowerCase().includes(w))) : [];
      listTemaer = serieHits.map((s) => ({ name: s.name, go: goSerie(s.id) }))
        .concat(TEMAER.filter((t) => hit(t.name + ' ' + (t.from || []).join(' '))).map((t) => ({ name: t.name, go: goTema(t.name) }))).slice(0, 5);
      const fast = [];
      if (!rest.length || serieHits.length) {
        unitHits.slice(0, 3).forEach(([n, kind]) => {
          const wanted = kind === 'kommune' ? [['gebyr', 'H'], ['gebyr', 'E'], ['reg', 'H'], ['plan', '']] : [['aars', ''], ['esg', '']];
          wanted.filter(([sid]) => !serieHits.length || serieHits.some((s) => s.id === sid))
            .forEach(([sid, vv]) => { const d = serieDocs(sid, n, vv)[0]; if (d) fast.push(d); });
        });
      }
      listDocs = fast.concat(VIDEN.filter((d) => hit(d.title + ' ' + d.org + ' ' + d.type + ' ' + d.temaer.join(' ') + ' ' + d.res)));
    }
    // Søgning, filtre og sortering øverst på Alle dokumenter og temasiderne
    const showFilters = view === 'tema' || view === 'alle';
    const base = listDocs;
    const fWords = st.fq.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const textOf = (d) => (d.title + ' ' + d.org + ' ' + d.type + ' ' + d.temaer.join(' ') + ' ' + d.res + ' ' + (d.long || '')).toLowerCase();
    const sortValue = st.fSort || (fWords.length ? 'match' : 'nyeste');
    const activeCount = [st.fTema && view !== 'tema', st.fOrg, st.fType, st.fYear].filter(Boolean).length;
    if (showFilters) {
      const score = (d) => fWords.reduce((s, w) => s + (d.title.toLowerCase().includes(w) ? 3 : 0) + (d.temaer.join(' ').toLowerCase().includes(w) ? 2 : 0) + textOf(d).split(w).length - 1, 0);
      const added = (d) => VIDEN.findIndex((x) => x.id === d.id);
      const byTitle = (a, b) => a.title.localeCompare(b.title, 'da');
      const cmp = {
        nyeste: (a, b) => (b.year - a.year) || byTitle(a, b),
        aeldste: (a, b) => (a.year - b.year) || byTitle(a, b),
        tilfoejet: (a, b) => added(a) - added(b),
        titel: byTitle,
        udgiver: (a, b) => a.org.localeCompare(b.org, 'da') || (b.year - a.year),
        match: (a, b) => (score(b) - score(a)) || (b.year - a.year)
      }[sortValue];
      listDocs = base.filter((d) => (view === 'tema' || !st.fTema || d.temaer.includes(st.fTema)) && (!st.fOrg || d.org === st.fOrg)
        && (!st.fType || d.type === st.fType) && (!st.fYear || String(d.year) === st.fYear) && fWords.every((w) => textOf(d).includes(w))).sort(cmp);
    }
    const countOpts = (vals) => Object.entries(vals.reduce((m, v) => { m[v] = (m[v] || 0) + 1; return m; }, {}));
    const optList = (vals, sorter) => countOpts(vals).sort(sorter || ((a, b) => a[0].localeCompare(b[0], 'da'))).map(([v, n]) => ({ value: v, label: v + ' (' + n + ')' }));
    // Alle felter fylder deres kolonne i filtergitteret, så kanterne flugter. Sorteringen står sidst på computer og lige under søgefeltet på mobil.
    const fSelBase = (on) => 'box-sizing: border-box; width: 100%; min-width: 0; min-height: ' + (narrow ? '44px' : '42px') + '; font: 400 15px "Roboto", Arial, sans-serif; padding: 0 8px; border-radius: 10px; color: #24312A; cursor: pointer; text-overflow: ellipsis; '
      + (on ? 'border: 1px solid #0A602D; background: #E6F4EA;' : 'border: 1px solid #C9D2CD; background: #FFFFFF;');
    const fSel = (on) => 'order: 2; ' + fSelBase(on);
    const isList = ['tema', 'alle', 'search'].includes(view);

    // Dokumentside
    const doc = view === 'doc' ? findDoc(st.docId) : null;
    let docVals = {};
    if (doc) {
      const versions = doc.sid ? serieDocs(doc.sid, doc.unit, doc.variant) : [];
      docVals = {
        ...doc, img: doc.img || '', noImg: !doc.img, coverTitle: doc.coverTitle || doc.title, coverYear: doc.coverYear || '',
        coverStyle: 'flex: 0 1 260px; display: block; width: 100%; max-width: 100%; aspect-ratio: 1 / 1.414; overflow: hidden; border: 1px solid #DAE0E0; border-radius: 15px; background: ' + (doc.img ? '#F4F6F2' : '#E6F4EA') + ';',
        title: doc.sid ? doc.title + ', ' + doc.org : doc.title,
        meta: doc.sid ? (doc.date ? 'Vedtaget ' + doc.date : doc.org) : doc.org + ' · udgivet ' + doc.year + ' · ' + doc.type,
        // Dokumentsiden viser det lange resumé (long), kortene det korte (res)
        longRes: doc.long || doc.res,
        hasStatus: !!doc.status, status: doc.status || '',
        statusStyle: 'font-size: 14px; font-weight: 500; color: #50656E;',
        hasUrl: !!doc.url && doc.url !== '#', noUrl: !doc.url || doc.url === '#',
        hasTemaer: !!(doc.temaer && doc.temaer.length), temaLinks: (doc.temaer || []).map((name) => ({ name, go: goTema(name) })),
        hasVersions: versions.length > 1,
        versions: versions.map((x) => ({ label: x.date ? 'Vedtaget ' + x.date : x.sid === 'gebyr' || x.sid === 'plan' ? x.title : x.short, status: x.cur ? x.status : '', cur: x.id === doc.id ? 'true' : 'false', open: () => this.setState({ docId: x.id }),
          statusStyle: 'font-size: 14px; color: #50656E;',
          style: 'display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%; min-height: 46px; padding: 0 16px; border-radius: 10px; cursor: pointer; font: 400 15px "Roboto", Arial, sans-serif; color: #24312A; background: #FFFFFF; border: ' + (x.id === doc.id ? '2px solid #0A602D' : '1px solid #DAE0E0') + ';' }))
      };
    }

    // Brødkrumme
    const f = st.from || { view: 'home' };
    const midFor = (fr) => fr.view === 'serie' ? { label: (SERIER.find((s) => s.id === fr.serie) || {}).name, go: go({ view: 'serie', serie: fr.serie }) }
      : fr.view === 'tema' && fr.tema ? { label: fr.tema, go: go({ view: 'tema', tema: fr.tema }) } : fr.view === 'alle' ? { label: 'Alle dokumenter', go: go({ view: 'alle' }) }
      : fr.view === 'search' ? { label: 'Søgeresultater', go: go({ view: 'home', q: fr.q }) } : null;
    let crumbMid = null, crumbHere = '';
    if (view === 'doc' && doc) { crumbMid = midFor(f); crumbHere = doc.sid ? doc.title + ', ' + doc.org : doc.title; }
    else if (view === 'serie') crumbHere = serie.name;
    else if (isList) crumbHere = listTitle;
    else if (view === 'indsend') crumbHere = 'Indsend dokumenter';

    // Indsend dokumenter: kræver mindst én fil og accept af deling. I prototypen bliver intet sendt.
    const nUp = st.upFiles.length;
    const sendUp = () => {
      const err = !nUp && !st.upShare ? 'Vælg mindst ét dokument, og sæt hak, hvis det må deles.'
        : !nUp ? 'Vælg mindst ét dokument.' : !st.upShare ? 'Sæt hak, hvis dokumenterne må deles.' : '';
      this.setState(err ? { upError: err } : { upSent: true, upError: '' });
    };

    // Faste dokumenter, temaer og "Se alle temaer" bruger samme felt og samme gitter, så forsiden hænger sammen
    // Lange ord deles med bindestreg (siden er dansk), og gitteret giver alle felter samme højde.
    const wrap = 'min-width: 0; hyphens: auto; -webkit-hyphens: auto; overflow-wrap: break-word;';
    const tileStyle = (s) => 'display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 2px; min-height: ' + (narrow ? '48px' : '52px') + '; padding: ' + (narrow ? '8px 12px' : '8px 18px') + '; border-radius: 15px; cursor: pointer; text-align: left; font: 700 ' + (narrow ? '14px' : '16px') + ' "Roboto", Arial, sans-serif; line-height: 1.25; color: #24312A; background: #F4F6F2; ' + wrap + ' '
      + (s.proposal ? 'border: 1px dashed #A9B5B0;' : 'border: 1px solid #DAE0E0;');

    // AI-spørgsmål i prompt-vinduet under søgefeltet. Spørgsmål om et enkelt dokument har sin egen tilstand på dokumentsiden.
    // AI-vinduet både svarer og finder dokumenter frem. Dokumenterne findes ud fra ordene i spørgsmålet
    // (ordstammer i titel, temaer og resuméer). Svaret er et eksempel; kun batterispørgsmålet har et rigtigt svar med kilder.
    const isBattery = /batter/i.test(st.aiQ);
    const STOP = new Set('hvad hvordan hvorfor hvor hvem hvilke hvilken hvornår koster findes finde gøre skal kunne have mange meget mest bedst andre nogle noget være blive bliver efter eller ikke også mere mellem over under ved fra med til om der som det den des sig jeg vi man kan er har gør affald affaldet kommune kommuner kommunerne kommunens dokument dokumenter'.split(' '));
    // Ord, der begynder med "affald", sammenlignes på flere bogstaver, ellers passer de på næsten alt
    const aiStems = st.aiQ.toLowerCase().replace(/[^a-zæøå0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length >= 4 && !STOP.has(w))
      .map((w) => w.slice(0, w.startsWith('affald') ? 10 : 7)).filter((w) => w.length > 7 || !w.startsWith('affald'));
    const aiScore = (d) => aiStems.reduce((s, w) => s + (d.title.toLowerCase().includes(w) ? 3 : 0) + (d.temaer.join(' ').toLowerCase().includes(w) ? 2 : 0)
      + (d.res.toLowerCase().includes(w) ? 1 : 0) + ((d.long || '').toLowerCase().includes(w) ? 1 : 0), 0);
    const aiSrc = isBattery ? ['C085', 'NIR'].map((id) => VIDEN.find((d) => d.id === id)) : [];
    // Kun dokumenter, der scorer mindst 40 % af det bedste, kommer med
    const aiBest = Math.max(0, ...VIDEN.map(aiScore));
    const aiHits = VIDEN.filter((d) => !aiSrc.includes(d)).map((d) => [d, aiScore(d)]).filter(([, s]) => s > 0 && s >= Math.max(2, aiBest * 0.4))
      .sort((a, b) => b[1] - a[1] || b[0].year - a[0].year).slice(0, 4).map(([d]) => d);
    const aiAnswer = isBattery ? 'Ifølge NIRAS\' analyse for KL kostede indsamling og håndtering af bærbare batterier i gennemsnit 11 kr. pr. kg, og kommunernes samlede omkostninger blev skønnet til 27 og 26 mio. kr. i 2021 og 2022 (kilde 2, side 4). Vil I opgøre jeres egen omkostning pr. kg, beskriver KL og Brancheforeningen Cirkulær, hvilke udgifter der skal med (kilde 1).'
      : aiHits.length ? 'I den færdige vidensbank skriver AI\'en her et kort svar ud fra dokumenterne nedenfor og henviser til, hvor i dokumenterne svaret står. I prototypen vises kun de dokumenter, der passer bedst til spørgsmålet.'
      : 'Ingen dokumenter i prototypen passer til spørgsmålet. Prøv fx "Hvad koster det at indsamle batterier?" eller "Erfaringer med genbrugspladser".';
    const aiSources = aiSrc.map((d, i) => ({ label: (aiSrc.length > 1 ? (i + 1) + '. ' : '') + (d.sid ? d.title + ', ' + d.org : d.title + ' (' + d.org + ', ' + d.year + ')'), open: openDoc(d) }));
    const aiDocs = aiHits.map((d) => ({ title: d.title, meta: d.org + ' · ' + d.year, img: d.img || '', coverBg: d.img ? '#F4F6F2' : '#E6F4EA', open: openDoc(d) }));
    const seg = (on) => 'min-height: 40px; padding: 0 14px; border: 0; border-radius: 8px; cursor: pointer; font: 500 15px "Roboto", Arial, sans-serif; ' + (on ? 'background: #0A602D; color: #FFFFFF;' : 'background: transparent; color: #24312A;');
    const newest = VIDEN.filter((d) => d.img).slice(0, 10).map((d) => ({ ...d, meta: d.org + ' · ' + d.year, open: openDoc(d) }));
    const heroFull = view === 'home' || view === 'search';
    // På forsiden fylder toppen skærmen (minus menuen), med formålet nederst og en pil ned til indholdet. Ved søgning er den lav.
    const heroTall = view === 'home';
    const docAi = !!doc && st.docAiId === st.docId;
    return {
      wide: !narrow, narrow,
      mobileMenu: narrow && st.menuOpen, menuOpenStr: String(narrow && st.menuOpen), menuLabel: st.menuOpen ? 'Luk' : 'Menu',
      toggleMenu: () => this.setState({ menuOpen: !st.menuOpen }),
      heroFull, heroTall, heroArrow: heroTall && !narrow, heroAi: heroFull && st.aiOpen,
      // Som den gamle forside: alt centreret i den øverste del, så skraldespanden står frit nederst.
      // Samme afstand foroven ved søgning, så søgefeltet ikke flytter sig, når man begynder at skrive.
      logoStyle: 'display: block; width: auto; height: ' + (narrow ? '22px' : '30px') + ';',
      heroInnerStyle: 'box-sizing: border-box; max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; position: relative; padding: clamp(36px, 9vh, 104px) max(16px, 3vw) 40px; '
        + (heroTall ? 'min-height: calc(100vh - 61px); min-height: min(calc(100svh - 61px), 960px);' : ''),
      heroMainStyle: 'display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; width: 100%;',
      heroCtaStyle: 'margin: 0; max-width: 640px; font-size: 16px; line-height: 1.55; color: #FFFFFF; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);',
      // Blød rulning, og et direkte hop bagefter, hvis browseren ikke ruller blødt
      scrollDown: () => { try {
        const el = document.getElementById('vb-indhold'); if (!el) return;
        const y0 = window.scrollY; el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => { if (window.scrollY === y0) el.scrollIntoView({ block: 'start' }); }, 350);
      } catch (e) {} },
      heroH1Style: 'margin: 0 0 4px; font-family: \'Inter\', \'Roboto\', Arial, sans-serif; font-weight: 700; font-size: clamp(44px, 8.5vw, 112px); line-height: 1; letter-spacing: 0; text-shadow: 0 2px 18px rgba(0, 0, 0, 0.25);',
      docAi, docAiStr: String(docAi),
      goHome: go({ view: 'home' }), goAlle: go({ view: 'alle', ...FRESET }),
      showFilters, showTemaFilter: view === 'alle', showFilterRow: !narrow || st.filtersOpen,
      fq: st.fq, setFq: (e) => this.setState({ fq: e.target.value }), fqPlaceholder: view === 'tema' ? 'Søg i ' + listTitle : 'Søg i alle dokumenter',
      sortValue, setFSort: (e) => this.setState({ fSort: e.target.value }), sortSelStyle: (narrow ? 'order: 1; ' : 'order: 3; ') + fSelBase(false),
      filterGridStyle: 'display: grid; grid-template-columns: ' + (narrow ? 'repeat(2, minmax(0, 1fr))' : 'repeat(auto-fill, minmax(150px, 1fr))') + '; gap: 8px; align-items: center; padding: 12px; border-radius: 15px; background: #F4F6F2;',
      sortOptions: (fWords.length ? [{ value: 'match', label: 'Bedst match' }] : []).concat([
        { value: 'nyeste', label: 'Nyeste først' }, { value: 'aeldste', label: 'Ældste først' }, { value: 'tilfoejet', label: 'Senest tilføjet' },
        { value: 'titel', label: 'Titel A-Å' }, { value: 'udgiver', label: 'Udgiver A-Å' }]),
      fTema: st.fTema, setFTema: (e) => this.setState({ fTema: e.target.value }), fTemaStyle: fSel(!!st.fTema),
      temaFilterOptions: optList(base.flatMap((d) => d.temaer)),
      fOrg: st.fOrg, setFOrg: (e) => this.setState({ fOrg: e.target.value }), fOrgStyle: fSel(!!st.fOrg), orgFilterOptions: optList(base.map((d) => d.org)),
      fType: st.fType, setFType: (e) => this.setState({ fType: e.target.value }), fTypeStyle: fSel(!!st.fType), typeFilterOptions: optList(base.map((d) => d.type)),
      fYear: st.fYear, setFYear: (e) => this.setState({ fYear: e.target.value }), fYearStyle: fSel(!!st.fYear),
      yearFilterOptions: optList(base.map((d) => String(d.year)), (a, b) => b[0].localeCompare(a[0])),
      hasActiveFilters: activeCount > 0 || fWords.length > 0, clearFilters: () => this.setState({ fq: '', fTema: '', fOrg: '', fType: '', fYear: '', fSort: '' }),
      filtersOpenStr: String(st.filtersOpen), toggleFilters: () => this.setState({ filtersOpen: !st.filtersOpen }),
      filterToggleLabel: 'Filtre' + (activeCount ? ' (' + activeCount + ')' : ''), goIndsend: go({ view: 'indsend', upSent: false, upError: '' }),
      isIndsend: view === 'indsend', upNotSent: view === 'indsend' && !st.upSent, upSent: view === 'indsend' && st.upSent,
      setUpFiles: (e) => this.setState({ upFiles: e.target.files ? Array.from(e.target.files).map((x) => x.name) : [], upError: '' }),
      upHasFiles: nUp > 0, upFileNames: st.upFiles.join(', '),
      upOrg: st.upOrg, setUpOrg: (e) => this.setState({ upOrg: e.target.value }),
      upTema: st.upTema, setUpTema: (e) => this.setState({ upTema: e.target.value }), temaOptions: TEMAER.map((t) => ({ name: t.name })).sort((a, b) => a.name.localeCompare(b.name, 'da')),
      upDesc: st.upDesc, setUpDesc: (e) => this.setState({ upDesc: e.target.value }),
      upName: st.upName, setUpName: (e) => this.setState({ upName: e.target.value }),
      upMail: st.upMail, setUpMail: (e) => this.setState({ upMail: e.target.value }),
      setUpShare: (e) => this.setState({ upShare: !!e.target.checked, upError: '' }),
      upHasError: !!st.upError, upError: st.upError, sendUp,
      upThanks: 'Vi har modtaget ' + nUp + (nUp === 1 ? ' dokument' : ' dokumenter') + (st.upOrg.trim() ? ' fra ' + st.upOrg.trim() : '') + '.',
      q: st.q, setQ: (e) => this.setState({ q: e.target.value }),
      aiOpen: st.aiOpen, aiOpenStr: String(st.aiOpen), aiToggleLabel: st.aiOpen ? 'Luk AI-spørgsmål' : 'Stil et spørgsmål til AI',
      toggleAi: () => this.setState({ aiOpen: !st.aiOpen }),
      aiQ: st.aiQ, setAiQ: (e) => this.setState({ aiQ: e.target.value, aiAsked: false }),
      askNow: () => this.setState({ aiAsked: true }),
      aiAsked: st.aiAsked && !!st.aiQ.trim(), aiAnswer, aiHasSources: aiSources.length > 0, aiSources,
      aiHasDocs: aiDocs.length > 0, aiDocs, aiDocsLabel: isBattery ? 'Flere dokumenter om emnet' : 'Dokumenter, der passer til spørgsmålet',
      askAboutDoc: () => docAi ? this.setState({ docAiId: '', docAsked: false })
        : this.setState({ docAiId: st.docId, docAsked: true, docQ: doc ? 'Hvad er det vigtigste i "' + (doc.sid ? doc.title + ', ' + doc.org : doc.title) + '"?' : '' }),
      docQ: st.docQ, setDocQ: (e) => this.setState({ docQ: e.target.value, docAsked: false }),
      askDocNow: () => this.setState({ docAsked: true }),
      docAsked: docAi && st.docAsked && !!st.docQ.trim(), docAnswer: doc ? doc.res : '',
      isHome: view === 'home', isSerie: view === 'serie', isList, isDoc: !!doc,
      hasCrumb: view !== 'home', hasCrumbMid: !!crumbMid, crumbMid: crumbMid || {}, crumbHere,
      serieTiles: SERIER.map((s) => ({ ...s, short: s.short || s.name, proposal: !!s.proposal, desc: s.proposal ? 'Forslag. ' + s.desc : s.desc, style: tileStyle(s), go: goSerie(s.id) })),
      temaTiles: TEMAER.filter((t) => t.primary).map((t) => ({ name: t.name, desc: t.desc, go: goTema(t.name) })),
      moreTemaer: TEMAER.filter((t) => !t.primary).sort((a, b) => a.name.localeCompare(b.name, 'da')).map((t) => ({ name: t.name, desc: t.desc, go: goTema(t.name) })),
      allTemaer: st.allTemaer, allTemaerStr: String(st.allTemaer), toggleTemaer: () => this.setState({ allTemaer: !st.allTemaer }),
      temaToggleLabel: st.allTemaer ? 'Vis færre temaer' : 'Vis alle ' + TEMAER.length + ' temaer',
      temaGridStyle: 'display: grid; grid-template-columns: ' + (narrow ? 'repeat(2, minmax(0, 1fr))' : 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))') + '; grid-auto-rows: 1fr; gap: ' + (narrow ? '8px' : '12px') + ';',
      temaSmallStyle: tileStyle({}),
      temaPillStyle: 'display: inline-flex; align-items: center; min-height: ' + (narrow ? '44px' : '36px') + '; padding: 0 12px; border-radius: 8px; border: 1px solid #DAE0E0; background: #F4F6F2; color: #24312A; font: 500 14px "Roboto", Arial, sans-serif; cursor: pointer;',
      hasListTemaer: listTemaer.length > 0, listTemaer,
      emptyText: showFilters && base.length ? 'Ingen dokumenter passer til søgningen eller filtrene. Prøv at fjerne et filter.'
        : view === 'tema' ? 'Prototypen har endnu ingen eksempler under dette tema. I den færdige vidensbank ligger temaets dokumenter her.' : 'Ingen dokumenter passer til søgningen.',
      newest,
      serie: { ...serie, ready: !serie.proposal, proposal: !!serie.proposal, hasVariant: !!serie.variant, findLabel: serie.unit === 'selskab' ? 'Find selskab' : 'Find kommune', unitLabel: serie.unit === 'selskab' ? 'Selskab' : 'Kommune', unitWord: serie.unit },
      kq: st.kq, setKq: (e) => this.setState({ kq: e.target.value }),
      hOn: String(st.variant === 'H'), eOn: String(st.variant === 'E'), hStyle: seg(st.variant === 'H'), eStyle: seg(st.variant === 'E'),
      setH: () => this.setState({ variant: 'H' }), setE: () => this.setState({ variant: 'E' }),
      rows, serieHeading, serieHint, hasEmpty: emptyUnits.length > 0, emptyUnits: emptyUnits.join(', '), noUnitHit, noUnitText,
      hasMoreUnits, moreUnitsLabel, showAllUnits: () => this.setState({ allUnits: true }),
      listTitle, listDesc, listDocs: listDocs.map(toRow), listEmpty: isList && listDocs.length === 0,
      listGridStyle: 'display: grid; grid-template-columns: ' + (narrow ? '1fr' : 'repeat(auto-fill, minmax(min(225px, 100%), 1fr))') + '; gap: ' + (narrow ? '12px' : '20px') + ';',
      newestCardStyle: 'display: flex; flex-direction: column; width: ' + (narrow ? '220px' : '240px') + '; padding: 0; border: 1px solid #DAE0E0; border-radius: 15px; overflow: hidden; background: #FFFFFF; text-align: left; cursor: pointer; font: inherit; color: inherit;',
      listCount: (showFilters && listDocs.length < base.length ? listDocs.length + ' af ' + base.length : String(listDocs.length)) + (base.length === 1 ? ' dokument' : ' dokumenter'),
      hasSeeAlso: seeAlso.length > 0, seeAlso,
      doc: docVals
    };
  }
}
window.Component = Component;
