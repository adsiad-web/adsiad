import type { NewsItem } from "@/domain/types";

const covers: Record<string, string> = {
  n1: "/archive/promo/422_adsiad-halkbank_2.jpg",
  n2: "/archive/promo/807_adsiad-mali_genel_kurul_2_2.jpg",
  n3: "/archive/promo/746_adsiad25.jpg",
  n4: "/archive/promo/523_adsiad-taider_aile_isletmeleri_14.jpg",
  n5: "/archive/news/442_adsiad-iran.jpg",
  n6: "/archive/news/adsiad-kadinlar-1.jpg",
  n7: "/archive/news/357_tebrik.jpg",
  n8: "/archive/promo/127_adsiad-vergi_dairesi_3.jpg",
  n9: "/archive/promo/791_adsiadsacitac228177m228177229255_2.jpg",
  n10: "/archive/promo/501_adsiad-altinoran-imza-sergi_2_1.jpg",
  n11: "/archive/promo/396_teror.jpg",
  n12: "/archive/promo/turkonfed-adana.jpg",
  n14: "/archive/promo/adana-gelinleri.jpg",
  n15: "/archive/promo/adsiad-belarus.jpg",
  n16: "/archive/promo/260_yonetim2016.jpg",
  n17: "/archive/news/386_sonmez-ogrenci.jpg",
  n18: "/archive/promo/435_adsiad-ato-adaso_2.jpg",
  n19: "/archive/promo/185_adsiad-genel_kurul_3.jpg",
  n20: "/archive/promo/878_adsiad_3.jpg",
  n21: "/archive/promo/634_adsiad_akademi-tarim_2_1.jpg",
  n22: "/archive/promo/adana-adsiad-gelecek.jpg",
  n23: "/archive/sosyal/2026-01-yesil-donusum/sonmez-01.webp",
  n24: "/archive/sosyal/2026-02-ikiz-donusum/01.webp",
  n25: "/archive/sosyal/2026-04-ayca-celik/01.webp",
  n26: "/archive/sosyal/2026-05-tusiad-ozan-diren/02.webp",
  n27: "/archive/sosyal/2026-05-turkonfed-ziyaret/02.webp",
};

const newsSeed: NewsItem[] = [
  {
    id: "n1",
    slug: "disa-acik-piyasa-ekonomisi",
    date: "2018-06-12",
    kind: "haber",
    title: {
      tr: "Dışa açık piyasa ekonomisi Çukurova’yı hareketlendirir",
      en: "An open market economy moves Çukurova",
    },
    excerpt: {
      tr: "Geleneksel Salı Toplantıları’nın konuğu Türkiye Halk Bankası Adana Bölge Müdürü Mustafa Atlı oldu.",
      en: "Halkbank Adana regional director Mustafa Atlı joined the Tuesday Meeting.",
    },
    body: {
      tr: "ADSİAD’ın düzenlediği Geleneksel Salı Toplantıları’nın bu ayki konuğu Türkiye Halk Bankası Adana Bölge Müdürü Mustafa Atlı oldu. Toplantıda finansman, üretim ve Çukurova’nın dışa açık büyüme imkânları konuşuldu.",
      en: "Mustafa Atlı of Halkbank addressed ADSİAD’s Traditional Tuesday Meeting on finance, production and Çukurova’s open-economy potential.",
    },
  },
  {
    id: "n2",
    slug: "adsiad-turkiye-vurgusu",
    date: "2018-05-20",
    kind: "haber",
    title: { tr: "ADSİAD’dan Türkiye vurgusu", en: "ADSİAD’s emphasis on Türkiye" },
    excerpt: {
      tr: "Olağan Mali Genel Kurul nedeniyle düzenlenen toplantıda birlik ve dayanışma öne çıktı.",
      en: "Unity and solidarity led the ordinary financial general assembly gathering.",
    },
    body: {
      tr: "Adana Sanayici ve İş İnsanları Derneği ailesi, Olağan Mali Genel Kurul nedeniyle düzenlenen hafta sonu toplantısında birlik-beraberlik ve dayanışma duygularını ön plana çıkardı.",
      en: "The ADSİAD family gathered for the ordinary financial general assembly, putting unity first.",
    },
  },
  {
    id: "n3",
    slug: "is-dunyasinin-zirvesi",
    date: "2018-04-18",
    kind: "haber",
    title: { tr: "İş dünyasının zirvesi ADSİAD’la buluştu", en: "Industry leaders met with ADSİAD" },
    excerpt: {
      tr: "Çeyrek yüzyıl toplantısında Türkiye’nin İlk 500 listesine giren üye firmalara plaket verildi.",
      en: "ISO 500 member firms received plaques at the quarter-century gathering.",
    },
    body: {
      tr: "ADSİAD’la Çeyrek Yüzyıl adı verilen toplantıda Türkiye’nin İlk 500 Sanayi Kuruluşu Listesi’ne giren ADSİAD üyesi firmalar ile yeni üyelere plaket verildi.",
      en: "At the Quarter Century meeting, member firms on Türkiye’s Top 500 industrials list and new members received plaques.",
    },
  },
  {
    id: "n4",
    slug: "kuzey-yildizi",
    date: "2018-09-01",
    kind: "duyuru",
    title: { tr: "Kuzey Yıldızı: Aile şirketlerinde sürdürülebilirlik", en: "North Star: Sustainability in family firms" },
    excerpt: {
      tr: "TAİDER ile birlikte aile şirketlerinde sürdürülebilirlik toplantısı.",
      en: "A sustainability meeting for family businesses with TAİDER.",
    },
    body: {
      tr: "ADSİAD, Aile İşletmeleri Derneği (TAİDER) ile birlikte ‘Aile Şirketlerinde Sürdürülebilirlik’ konulu toplantı düzenledi. Toplantıya Adana Sanayi Odası Genel Sekreteri Bora Kocaman, Başkan Süleyman Sönmez ve AOSB İşadamları Derneği Başkanı Mustafa Akalın katıldı.\n\nAçılış konuşmasını yapan Başkanvekili Vedat Gizer, Türkiye’deki işletmelerin yüzde 95’ine yakınının aile işletmesi olduğunu, KOBİ’ler dahil edildiğinde oranın yüzde 98’e çıktığını söyledi. TAİDER Başkanı Aydın Öğücü, kurumsallaşma olmadan aile şirketlerinin yeterince uzun yaşamadığını vurguladı.\n\nPanelde TETA Teknik Tarım’dan Sumer Tömer Bayındır’ın yönetiminde Öğücü, Özbuğday’dan Aykut Özbuğday ve Prof. Dr. Müberra Babaoğul söz aldı. Kuzey Yıldızı Sürdürülebilirlik Ödülleri, 2 Kasım 2018’de İstanbul’daki TAİDER 6. Ulusal Aile İşletmeleri Zirvesi’nde sahiplerini bulacaktı.",
      en: "ADSİAD hosted a family-business sustainability meeting with TAİDER. Vice-chair Vedat Gizer noted that nearly 95 percent of Turkish firms are family-owned. TAİDER chair Aydın Öğücü said family firms do not last without institutionalisation.",
    },
  },
  {
    id: "n5",
    slug: "turk-iran-is-konseyi",
    date: "2018-03-10",
    kind: "haber",
    title: { tr: "Türk-İran İş Konseyi ADSİAD görüşmesi", en: "Türkiye–Iran Business Council visits ADSİAD" },
    excerpt: {
      tr: "Reza Kami ve heyeti Başkan Süleyman Sönmez ile bir araya geldi.",
      en: "Reza Kami and his delegation met Chair Süleyman Sönmez.",
    },
    body: {
      tr: "Türk-İran İş Konseyi Başkanı Reza Kami ve beraberindeki heyet ADSİAD Başkanı Süleyman Sönmez ve yönetim kurulu üyeleriyle görüştü.",
      en: "The Türkiye–Iran Business Council chair Reza Kami met ADSİAD’s chair and board.",
    },
  },
  {
    id: "n6",
    slug: "kadin-istihdami",
    date: "2018-03-08",
    kind: "haber",
    title: { tr: "Türkiye’de kadın istihdamı artmalı", en: "Women’s employment in Türkiye must rise" },
    excerpt: {
      tr: "8 Mart vesilesiyle ADSİAD’ın en genç üyesi Elif Sönmez kamuoyuna mesaj yayımladı.",
      en: "On 8 March, ADSİAD’s youngest member Elif Sönmez issued a public message.",
    },
    body: {
      tr: "8 Mart Dünya Kadınlar Günü nedeniyle bir araya gelen ADSİAD, en genç üyesi mimar Elif Sönmez aracılığıyla kamuoyuna mesaj yayımladı.",
      en: "ADSİAD marked International Women’s Day with a message delivered by architect Elif Sönmez.",
    },
  },
  {
    id: "n7",
    slug: "cevre-bakani-tebrik",
    date: "2018-07-12",
    kind: "haber",
    title: { tr: "Çevre Bakanı tebriği", en: "Congratulations to the Environment Minister" },
    excerpt: {
      tr: "ÇUKUROVA SİFED ve ADSİAD, Adana milletvekili Fatmagül Demet Sarı’nın bakanlık görevini tebrik etti.",
      en: "ÇUKUROVA SİFED and ADSİAD congratulated Adana MP Fatmagül Demet Sarı on her cabinet post.",
    },
    body: {
      tr: "Çukurova Sanayi ve İş Dünyası Federasyonu ile ADSİAD Başkanı Süleyman Sönmez, yeni kabinede Adana milletvekili Fatmagül Demet Sarı’nın görevini tebrik etti.",
      en: "Chair Süleyman Sönmez congratulated Adana MP Fatmagül Demet Sarı on her appointment in the new cabinet.",
    },
  },
  {
    id: "n8",
    slug: "vergi-yapilandirma",
    date: "2018-05-18",
    kind: "haber",
    title: {
      tr: "Adana’nın vergi geliri artarsa genel bütçeden alacağı pay da artar",
      en: "If Adana’s tax take rises, so does its share of the national budget",
    },
    excerpt: {
      tr: "Adana Vergi Dairesi Başkanı Ahmet Tunalı, yapılandırma kanununu ADSİAD merkezinde anlattı.",
      en: "Adana tax office director Ahmet Tunalı briefed ADSİAD on the restructuring law.",
    },
    body: {
      tr: "Adana Vergi Dairesi Başkanı Ahmet Tunalı, 18 Mayıs 2018’de yürürlüğe giren 7143 sayılı yapılandırma kanunu kapsamında ADSİAD merkezinde Başkan Süleyman Sönmez ve yönetim kurulunu ziyaret etti.\n\nSönmez, ADSİAD, ÇUKUROVA SİFED ve TÜRKONFED üyelerinin ekonomiye ve vergi dünyasına katkı koyduğunu, vergi gelirlerinin artmasının Adana’nın genel bütçeden alacağı payı da yükselteceğini söyledi. Tunalı, peşin veya ilk iki taksitte ödeme indirimlerini, pişmanlık beyanını ve gib.gov.tr / turkiye.gov.tr başvurularını anlattı.\n\nZiyarette Ahmet Balıkçı, Kamil Kurt, Hasan Özkan ile Vedat Gizer, Sadık Büyükkardeş, Emir Değişmez, Şentürk Çalık, Mehmet Erel, Süleyman Emen, İsmail Bacaksızlar, Mustafa Öncül ve Selçuk Tansalar yer aldı.",
      en: "Tax office director Ahmet Tunalı briefed ADSİAD on law 7143. Chair Sönmez said higher tax receipts would lift Adana’s share of the national budget.",
    },
  },
  {
    id: "n9",
    slug: "yukselen-liderler",
    date: "2018-02-20",
    kind: "haber",
    title: { tr: "Türkiye’nin Yükselen Liderleri ödüllendirildi", en: "Rising Leaders of Türkiye honoured" },
    excerpt: {
      tr: "TÜRKONFED listesindeki Sepaş, Zahit Alüminyum, Gürsoy Yem ve Abdioğulları üyelerine ödül verildi.",
      en: "Sepaş, Zahit Aluminium, Gürsoy Yem and Abdioğulları members on the TÜRKONFED list were honoured.",
    },
    body: {
      tr: "TÜRKONFED Türkiye’nin Yükselen Liderleri 2017 listesine giren ADSİAD üyeleri Sacit Acımış (Sepaş Plastik), Zahit Balbay (Zahit Alüminyum), Günkut Gürsoy (Gürsoy Yem) ve Salih Sütçü’ye (Abdioğulları) ödül verildi.",
      en: "ADSİAD members Sacit Acımış, Zahit Balbay, Günkut Gürsoy and Salih Sütçü were honoured on TÜRKONFED’s Rising Leaders 2017 list.",
    },
  },
  {
    id: "n10",
    slug: "toroslar-nadide-cicekler",
    date: "2018-04-08",
    kind: "haber",
    title: { tr: "Toroslar ve Nadide Çiçekleri", en: "The Taurus and its rare flowers" },
    excerpt: {
      tr: "Altınoran ve ADSİAD, Orta Toroslar’ın bitkisel zenginliğini kitaba dönüştürdü.",
      en: "Altınoran and ADSİAD turned the flora of the Central Taurus into a book.",
    },
    body: {
      tr: "Altınoran Düşünce ve Sanat Platformu ile ADSİAD, S. Haluk Uygur, Gülsüm Ünal, Tansu Hastürk, Ozan Gözüyeşil ve Serpil Demirci Kayıran’ın fotoğraflarını ‘Toroslar ve Nadide Çiçekleri’ kitabında birleştirdi. Portakal Çiçeği Karnavalı kapsamında Altınoran Sanat Galerisi’nde dijital sergi ve imza günü yapıldı.\n\nBaşkan Sönmez, ADSİAD’ın kente yalnızca ekonomik değil kültürel alanda da katkı koyduğunu söyledi. Kitabı yayına Çukurova Üniversitesi’nden Yrd. Doç. Dr. Serpil Kayıran Demirci hazırladı; çeviri Ayşe Ateşoğlu, redaksiyon Mustafa Özke, tasarım Halil Şafak.",
      en: "Altınoran and ADSİAD published The Taurus and its Rare Flowers, with a digital exhibition during the Orange Blossom Carnival. Chair Sönmez underlined ADSİAD’s cultural contribution to the city.",
    },
  },
  {
    id: "n11",
    slug: "adana-saldirisini-kiniyoruz",
    date: "2018-04-24",
    kind: "haber",
    title: { tr: "Adana saldırısını şiddetle kınıyoruz", en: "We strongly condemn the Adana attack" },
    excerpt: {
      tr: "Başkan Sönmez, Adana Valiliği’ni hedef alan saldırıyı kınadı.",
      en: "Chair Sönmez condemned the attack targeting the Adana Governorate.",
    },
    body: {
      tr: "Adana Sanayici ve İş İnsanları Derneği Başkanı Süleyman Sönmez, Adana Valiliği’ni hedef alan terör saldırısını kınadı, vatandaşlara birlik ve beraberlik çağrısı yaptı.",
      en: "Chair Süleyman Sönmez condemned the attack on the Adana Governorate and called for unity.",
    },
  },
  {
    id: "n12",
    slug: "turkonfed-yurutme-adana",
    date: "2018-04-05",
    kind: "duyuru",
    title: { tr: "TÜRKONFED Yürütme Kurulu Nisan’da Adana’da", en: "TÜRKONFED Executive Board in Adana in April" },
    excerpt: {
      tr: "ÇUKUROVA SİFED ve ADSİAD ev sahipliğinde yürütme kurulu Adana’da toplandı.",
      en: "The executive board met in Adana, hosted by ÇUKUROVA SİFED and ADSİAD.",
    },
    body: {
      tr: "TÜRKONFED Yürütme Kurulu, ÇUKUROVA SİFED ve ADSİAD ev sahipliğinde Nisan’da Adana’da bir araya geldi.",
      en: "TÜRKONFED’s Executive Board met in Adana in April under ÇUKUROVA SİFED and ADSİAD.",
    },
  },
  {
    id: "n13",
    slug: "buyuyen-kobiler",
    date: "2018-03-15",
    kind: "duyuru",
    title: { tr: "Büyüyen KOBİ’ler toplantısı", en: "Growing SMEs meeting" },
    excerpt: {
      tr: "ÇUKUROVA SİFED ile ADSİAD, büyüyen KOBİ’ler için masaya oturdu.",
      en: "ÇUKUROVA SİFED and ADSİAD sat down on growing SMEs.",
    },
    body: {
      tr: "Çukurova Sanayi ve İş Dünyası Federasyonu ile ADSİAD, büyüyen KOBİ’ler toplantısını birlikte düzenledi.",
      en: "ÇUKUROVA SİFED and ADSİAD hosted a meeting on growing SMEs.",
    },
  },
  {
    id: "n14",
    slug: "adananin-gelinleri",
    date: "2018-04-14",
    kind: "haber",
    title: { tr: "Adana’nın Gelinlerinde karnaval coşkusu", en: "Carnival with Adana’s Brides" },
    excerpt: {
      tr: "Portakal Çiçeği Karnavalı kortejinde Adana’nın Gelinleri yer aldı.",
      en: "Adana’s Brides walked the Orange Blossom Carnival.",
    },
    body: {
      tr: "Adana’da üçüncüsü düzenlenen ve yaklaşık 100 bin kişinin katıldığı Portakal Çiçeği Karnavalı kortejine Adana’nın Gelinleri katıldı. Eski sitede bu yürüyüş, ‘Adana’yı Seviyorum’ projesi kapsamında kayda geçti.",
      en: "Adana’s Brides walked the third Orange Blossom Carnival, among about 100,000 people, as part of the I Love Adana line named on the old site.",
    },
  },
  {
    id: "n15",
    slug: "belarus-yatirkim",
    date: "2018-03-22",
    kind: "haber",
    title: { tr: "ADSİAD, Belarus iş dünyasını Çukurova’ya yatırıma çağırdı", en: "ADSİAD invited Belarusian business to invest in Çukurova" },
    excerpt: {
      tr: "Adana ve Çukurova’nın Belarus ile ekonomik işbirliği potansiyeli masaya yatırıldı.",
      en: "The economic potential between Adana–Çukurova and Belarus was tabled.",
    },
    body: {
      tr: "ADSİAD, Adana ve Çukurova’nın Belarus Cumhuriyeti ile ekonomik işbirliği potansiyelini masaya yatırdı.",
      en: "ADSİAD tabled the economic-cooperation potential of Adana and Çukurova with Belarus.",
    },
  },
  {
    id: "n16",
    slug: "adsiadda-yeni-donem",
    date: "2016-05-25",
    kind: "haber",
    title: { tr: "ADSİAD’da yeni dönem", en: "A new term at ADSİAD" },
    excerpt: {
      tr: "25 Mayıs 2016 genel kurulunda Süleyman Sönmez oybirliğiyle yeniden başkan seçildi; görev bölümü açıklandı.",
      en: "On 25 May 2016 Süleyman Sönmez was re-elected chair unanimously; roles were assigned.",
    },
    body: {
      tr: "ADSİAD Olağan Genel Kurulu’nda Süleyman Sönmez oybirliğiyle yeniden başkanlığa seçildi. 2016 yönetim kurulunda Sönmez (STS Grup), Toker Özcan (SASA), Hasan Adalı, Süleyman Gerdan (Germaksan), Vedat Gizer, İbrahim Eserce (TEMSA), Olcay Değirmenci, Türkan Cerrahoğlu, Fatih Asal (Wavin Pilsa), Emir Değişmez, Oktay Özbiçer, Mehmet Erel, Bülent Yamaç, Mustafa Öncül ve Selahiddin Nas yer aldı.\n\nGörev bölümünde Gizer başkanvekili; Adalı yatırımlar, Gerdan KOBİ, Özcan sosyal sorumluluk, Erel Akademi, Cerrahoğlu kadın ve aile, Öncül genel sekreter, Eserce AB ve uluslararası ilişkiler olarak kayda geçti.\n\nSönmez, iş insanlarının motive edilmesi, yatırımların yüksek katma değere kayması ve eğitim kalitesinin yükseltilmesi gerektiğini söyledi. (2018 olağan genel kurulundaki kadro, Kurullar sayfasındadır.)",
      en: "The 25 May 2016 assembly re-elected Süleyman Sönmez. The 2016 board included Toker Özcan (SASA) and Süleyman Gerdan among others. The 2018 board now published under Boards superseded this list.",
    },
  },
  {
    id: "n17",
    slug: "anlamli-gunde-roportaj",
    date: "2015-11-24",
    kind: "haber",
    title: { tr: "Anlamlı günde çok özel röportaj", en: "A special interview on Teachers’ Day" },
    excerpt: {
      tr: "24 Kasım’da Başkan Sönmez, Doğa Koleji öğrencilerini ofisinde ağırladı.",
      en: "On 24 November Chair Sönmez hosted Doğa College pupils in his office.",
    },
    body: {
      tr: "24 Kasım Öğretmenler Günü’nde Başkan Süleyman Sönmez, Doğa Koleji Türkçe öğretmeni Şebnem Batmaz ve öğrencilerini ofisinde ağırladı. Okul dergisi için hayatını, iş yaşamını, dernek faaliyetlerini ve Adana’nın ekonomik-sosyal yapısını anlattı.\n\nSönmez, öğretmenlerin özlük haklarının iyileştirilmesi gerektiğini vurguladı ve Batmaz’a çiçek sundu.",
      en: "On Teachers’ Day Chair Sönmez hosted Doğa College teacher Şebnem Batmaz and her pupils, spoke about Adana and the association, and called for better conditions for teachers.",
    },
  },
  {
    id: "n18",
    slug: "adana-is-dunyasi-kenetlenecek",
    date: "2018-07-08",
    kind: "haber",
    title: { tr: "Adana iş dünyası kenetlenecek", en: "Adana’s business world will lock together" },
    excerpt: {
      tr: "Başkan Sönmez, ATO ve ADASO’ya hayırlı olsun ziyaretinde ortak proje çağrısı yaptı.",
      en: "Chair Sönmez called for joint projects on courtesy visits to ATO and ADASO.",
    },
    body: {
      tr: "Süleyman Sönmez, yeni kabinenin ardından ATO Başkanı Atilla Menevşe, Meclis Başkanı İsmail Acı ve ADASO Başkanı Zeki Kıvanç ile yönetimlerini ziyaret etti. Yanında Vedat Gizer, Sadık Büyükkardeş, Emir Değişmez, Şentürk Çalık, Mehmet Erel, Süleyman Emen, İsmail Bacaksızlar, Mustafa Öncül ve Selçuk Tansalar vardı.\n\nSönmez, seçimin bittiğini, yaşanabilirlik katsayısının artması için ortak paydada çalışılması gerektiğini söyledi. Menevşe Tarım İhtisas Sanayi Bölgesi ve seracılığı; Kıvanç yatırım, üretim, istihdam ve ihracatı vurguladı.",
      en: "After the new cabinet, Chair Sönmez visited ATO chair Atilla Menevşe and ADASO chair Zeki Kıvanç, calling for joint projects now that the election was over.",
    },
  },
  {
    id: "n19",
    slug: "olagan-genel-kurul",
    date: "2018-02-10",
    kind: "haber",
    title: { tr: "ADSİAD olağan genel kurul toplantısı", en: "ADSİAD ordinary general assembly" },
    excerpt: {
      tr: "Süleyman Sönmez güven tazeledi. Akademi’nin halka açılması ve mentörlük, dönemin cümlesi oldu.",
      en: "Süleyman Sönmez was confirmed. Opening the Academy and mentoring were the term’s sentences.",
    },
    body: {
      tr: "Olağan genel kurulda divan başkanlığını Salim Aydın, üyeliği Cengiz Bakımlı ve Süheyla Gergin üstlendi. Başkan Sönmez, Akademi’yi halka açmayı, gençler ve kadınlar için girişimciliği, 4.0’ı gündemine alan bir dernek olmayı ve sıfırdan başlayanlara mentörlük etmeyi hedefledi.\n\nYönetim: Süleyman Sönmez, Vedat Gizer, Hasan Adalı, Olcay Değirmenci, Türkan Cerrahoğlu, Fatih Asal, Emir Değişmez, Mehmet Erel, Mustafa Öncül, Selahiddin Nas, İbrahim Eserce, Sadık Büyükkardeş, İsmail Bacaksızlar, Süleyman Emen, Şentürk Çalık.\n\nOnur Kurulu: Hüseyin Sözlü, Zeydan Karalar, Semra Büyüknisan. Yüksek İstişare Başkanı Cahit Sınmaz, ADSİAD’ın Adana’nın bir değeri olduğunu söyledi. CHP milletvekili Zülfikar İnönü Tümer kurula sürpriz ziyaret yaptı.\n\nAyrıca Bilim, Bilgi Teknolojileri, Eğitim, Hukuk kurulları ve Sosyal Komite (Fuar) duyuruldu; isimler yayımlanmadı.",
      en: "The ordinary assembly confirmed Süleyman Sönmez and the 2018 board now listed under Boards. He pledged to open the Academy to the public and to mentor those who start from zero.",
    },
  },
  {
    id: "n20",
    slug: "is-dunyasinin-gundemi-cukurova",
    date: "2018-02-18",
    kind: "haber",
    title: { tr: "İş dünyasının gündemi Çukurova", en: "Business on the agenda: Çukurova" },
    excerpt: {
      tr: "Sheraton’da Yükselen Liderler törenine Hüseyin Sözlü ve TÜRKONFED Başkanı Tarkan Kadooğlu katıldı.",
      en: "Hüseyin Sözlü and TÜRKONFED chair Tarkan Kadooğlu joined the Rising Leaders evening at the Sheraton.",
    },
    body: {
      tr: "ADSİAD, Türkiye’nin Yükselen Liderleri 2017 listesindeki üye firmalar için Sheraton’da tören düzenledi. Konuklar Adana Büyükşehir Belediye Başkanı Hüseyin Sözlü ve TÜRKONFED Başkanı Tarkan Kadooğlu’ydu.\n\nSönmez, teknolojiyi kullananın 1-0 önde başladığını, Çukurova’nın enerji, gastronomi ve tarımla parlaması gerektiğini söyledi. Kadooğlu gelişmiş ekonomi için gelişmiş demokrasi ve yapısal reform vurgusu yaptı. Sözlü, Devlet Bahçeli Köprüsü ve sahil düzenlemesini anlattı.",
      en: "ADSİAD honoured Rising Leaders 2017 members at the Sheraton, with mayor Hüseyin Sözlü and TÜRKONFED chair Tarkan Kadooğlu. Sönmez said those who use technology start 1–0 up.",
    },
  },
  {
    id: "n21",
    slug: "akademi-tarim-kalkinma",
    date: "2018-05-08",
    kind: "haber",
    title: {
      tr: "Akademi, tarımda kalkınma modellerini masaya yatırdı",
      en: "The Academy tabled agricultural development models",
    },
    excerpt: {
      tr: "Divan Otel’de Geleneksel Salı’nın konuğu Özler Tarım Genel Müdürü Özbek Haldun Özler oldu.",
      en: "Özbek Haldun Özler of Özler Tarım addressed the Tuesday Meeting at Divan.",
    },
    body: {
      tr: "ADSİAD Akademi, ‘Çukurova Tarımında Sürdürülebilir Bir Kalkınma İçin Başarılı İş Modelleri ve Yatırımlar’ı konuştu. Başkan Sönmez, tarımda inovasyonun şart olduğunu, yılda 2,5’un üstünde üretim yapılan ovada ulusal ve tutarlı tarım politikası istedi.\n\nÖzler, pazar darlığını — özellikle Rusya bağımlılığını — aşmak, gıda güvenliği ve izlenebilirliği yükseltmek, toprak bölünmesine karşı toplulaştırma gerektiğini söyledi. Toplantıda Cahit Sınmaz, MESİAD Başkanı Hasan Engin, Adana İŞKAD Başkanı Belgin Özçelik ve Mersin GİŞKAD Başkanı Ayferi Tuğcu vardı. Plaketi İbrahim Eserce takdim etti.",
      en: "The Academy discussed sustainable agricultural models for Çukurova. Guest Özbek Haldun Özler of Özler Tarım called for wider export markets and land consolidation.",
    },
  },
  {
    id: "n22",
    slug: "ekonomik-gelecek-sozlu",
    date: "2018-02-13",
    kind: "haber",
    title: { tr: "Adana’nın ekonomik geleceği masaya yatırıldı", en: "Adana’s economic future on the table" },
    excerpt: {
      tr: "Geleneksel Salı Toplantısı’nda konuk Adana Büyükşehir Belediye Başkanı Hüseyin Sözlü’ydü.",
      en: "Metropolitan mayor Hüseyin Sözlü was the guest of the Tuesday Meeting.",
    },
    body: {
      tr: "ADSİAD Geleneksel Salı Toplantısı’nda Adana Büyükşehir Belediye Başkanı Hüseyin Sözlü’yü ağırladı. Kentin ekonomik geleceği, yaşanabilirlik ve ortak projeler konuşuldu.",
      en: "The Tuesday Meeting hosted metropolitan mayor Hüseyin Sözlü on Adana’s economic future.",
    },
  },
  {
    id: "n23",
    slug: "adana-yesil-donusum-paneli-ve-calistayi",
    date: "2026-01-13",
    kind: "haber",
    title: {
      tr: "Adana’nın yeşil dönüşüm yol haritası ADSİAD ev sahipliğinde konuşuldu",
      en: "Adana’s green transition roadmap discussed at an ADSİAD-hosted panel and workshop",
    },
    excerpt: {
      tr: "13–14 Ocak 2026’da Çukurova Kalkınma Ajansı’nda Yeşil Dönüşüm Yol Haritası Paneli ve Yerel İklim Değişikliği Eylem Planı Hazırlık Çalıştayı yapıldı.",
      en: "On 13–14 January 2026 the Green Transition Roadmap Panel and the Local Climate Change Action Plan Preparatory Workshop were held at the Çukurova Development Agency.",
    },
    body: {
      tr: "Adana Yeşil Dönüşüm Koordinasyon Merkezi projesi kapsamında “Adana’nın Yeşil Dönüşüm Yol Haritası Paneli” ile “Adana Yeşil Dönüşüm ve Yerel İklim Değişikliği Eylem Planı Hazırlık Çalıştayı”, 13–14 Ocak 2026’da Çukurova Kalkınma Ajansı (ÇKA) Konferans Salonu’nda yapıldı. Proje; Avrupa Birliği tarafından finanse edilen ve Birleşmiş Milletler Kalkınma Programı (UNDP) tarafından uygulanan Sivil Katılım Hibe Programı kapsamında, ADSİAD’ın başvuru sahipliğinde, Adana Büyükşehir Belediyesi ve Adana Ticaret Odası ortaklığında yürütülüyor.\n\nAçılışa Adana Büyükşehir Belediyesi Başkan Vekili Güngör Geçer, TÜRKONFED Başkanı Süleyman Sönmez, Adana Sanayi Odası Başkanı Zeki Kıvanç, Adana Ticaret Odası Başkanı Yücel Bayram, Adana Hacı Sabancı OSB Başkanı Bekir Sütcü ve ADSİAD Başkanı Vedat Gizer ile kamu kurumları ve sivil toplum kuruluşlarının temsilcileri katıldı.\n\nEv sahibi olarak açılış konuşmasını yapan ADSİAD Başkanı Vedat Gizer, panel ve çalıştayın projenin son etaplarından biri olduğunu söyledi. Avrupa Birliği’ne ithal edilen belirli ürünler için sınırda karbon sertifikası ücret ödeme yükümlülüğünün 1 Ocak 2026’da başladığını hatırlatan Gizer, “İşletmelerin yeşil dönüşüm süreçlerine rehberlik edecek, sürdürülebilirlik yolunda onlara güçlü bir destek sağlayacağına inandığımız Adana Yeşil Dönüşüm Koordinasyon Merkezi projemizin kurulmasını gerçekten önemsiyoruz” dedi. Gizer, proje kapsamında Adana’daki teknik uzman açığını kapatmak üzere 20 kişiye ISO 14064 sera gazı doğrulayıcı eğitimi verildiğini ve bu kişilerin sınavda başarılı olduğunu belirtti.\n\nTÜRKONFED Başkanı Süleyman Sönmez de “Bugün kentimiz, Türkiye üretim hatlarını Marmara’dan sonra Adana–Çukurova eksenine taşıyabilecek bir eşiğe gelmiş durumda” dedi.\n\nProje Koordinatörü Dr. Öğr. Üyesi Kamuran Öztop’un sunumunun ardından, TÜRKONFED Yönetim Kurulu Başkan Yardımcısı ve Yeşil Dönüşüm Komisyonu Başkanı Onur Ünlü’nün moderatörlüğünde “Adana’nın Yeşil Dönüşüm Yol Haritası” paneli yapıldı. Panelde Escarus Genel Müdürü Dr. Kubilay Kavak, EY Türkiye İklim Değişikliği ve Sürdürülebilirlik Hizmetleri Genel Müdürü Ece Sevin ve GTE Karbon Firma Ortağı Kemal Demirkol konuştu. Panelin ardından kamu kurumları, sivil toplum kuruluşları ve firmaların katıldığı çalıştay yapıldı.\n\nProje hakkında: [Adana Yeşil Dönüşüm Koordinasyon Merkezi](/faaliyetler/projeler) · Fotoğraflar: [Galeri](/faaliyetler/galeri)\n\nKaynak: [ADSİAD Instagram, çalıştay videosu (14 Ocak 2026)](https://www.instagram.com/reel/DTe7cMnAmEw/) · [Süleyman Sönmez ve ADSİAD ortak paylaşımı (13 Ocak 2026)](https://www.instagram.com/p/DTcnIi8jYCU/) · [TÜRKONFED ve ADSİAD ortak paylaşımı (13 Ocak 2026)](https://www.instagram.com/p/DTc3UkGiHCg/) · [Gündem Adana (15 Ocak 2026)](https://www.gundemadana.com/adana-yesil-donusumde-turkiye-liderligine-aday/) · [Referans Türk](https://www.referansturk.com.tr/haber/27250587/adanada-yesil-donusum-masaya-yatirildi)",
      en: "As part of the Adana Green Transition Coordination Centre project, the “Adana Green Transition Roadmap Panel” and the “Adana Green Transition and Local Climate Change Action Plan Preparatory Workshop” were held on 13–14 January 2026 in the conference hall of the Çukurova Development Agency (ÇKA). The project is run under the Civic Engagement Grant Programme, financed by the European Union and implemented by the United Nations Development Programme (UNDP), with ADSİAD as the applicant and Adana Metropolitan Municipality and the Adana Chamber of Commerce as partners.\n\nThe opening was attended by Adana Metropolitan Municipality Deputy Mayor Güngör Geçer, TÜRKONFED Chair Süleyman Sönmez, Adana Chamber of Industry Chair Zeki Kıvanç, Adana Chamber of Commerce Chair Yücel Bayram, Adana Hacı Sabancı Organised Industrial Zone Chair Bekir Sütcü and ADSİAD Chair Vedat Gizer, together with representatives of public institutions and civil society organisations.\n\nOpening the event as host, ADSİAD Chair Vedat Gizer said the panel and workshop were among the final stages of the project. Recalling that the obligation to pay for border carbon certificates on certain products imported into the European Union began on 1 January 2026, Gizer said: “We truly value the establishment of our Adana Green Transition Coordination Centre project, which we believe will guide businesses through their green transition and give them strong support on the road to sustainability.” He added that, to close the gap in trained technical experts in Adana, 20 people had received ISO 14064 greenhouse gas verifier training under the project and had passed the exam.\n\nTÜRKONFED Chair Süleyman Sönmez said: “Today our city has reached a threshold where it can carry Türkiye’s production lines to the Adana–Çukurova axis after Marmara.”\n\nAfter a presentation by Project Coordinator Asst. Prof. Dr. Kamuran Öztop, a panel on “Adana’s Green Transition Roadmap” was moderated by Onur Ünlü, TÜRKONFED Board Vice-Chair and Chair of its Green Transition Commission. The speakers were Dr. Kubilay Kavak, General Manager of Escarus; Ece Sevin, General Manager of Climate Change and Sustainability Services at EY Türkiye; and Kemal Demirkol, Partner at GTE Karbon. The panel was followed by a workshop bringing together public institutions, civil society organisations and companies.\n\nAbout the project: [Adana Green Transition Coordination Centre](/faaliyetler/projeler) · Photos: [Gallery](/faaliyetler/galeri)\n\nSources (in Turkish): [ADSİAD Instagram, workshop video (14 January 2026)](https://www.instagram.com/reel/DTe7cMnAmEw/) · [Joint post by Süleyman Sönmez and ADSİAD (13 January 2026)](https://www.instagram.com/p/DTcnIi8jYCU/) · [Joint post by TÜRKONFED and ADSİAD (13 January 2026)](https://www.instagram.com/p/DTc3UkGiHCg/) · [Gündem Adana (15 January 2026)](https://www.gundemadana.com/adana-yesil-donusumde-turkiye-liderligine-aday/) · [Referans Türk](https://www.referansturk.com.tr/haber/27250587/adanada-yesil-donusum-masaya-yatirildi)",
    },
  },
  {
    id: "n24",
    slug: "ikiz-donusumde-yeni-ufuklar-adana",
    date: "2026-02-05",
    kind: "haber",
    title: {
      tr: "İkiz Dönüşümde Yeni Ufuklar Projesi Adana’da",
      en: "The New Horizons in the Twin Transition project in Adana",
    },
    excerpt: {
      tr: "TÜRKONFED ve Garanti BBVA’nın KOBİ’lere yönelik projesinin üçüncü buluşması, ÇUKUROVA SİFED ev sahipliğinde Sheraton Grand Adana’da yapıldı.",
      en: "The third meeting of the TÜRKONFED and Garanti BBVA project for SMEs was held at the Sheraton Grand Adana, hosted by ÇUKUROVA SİFED.",
    },
    body: {
      tr: "TÜRKONFED ve Garanti BBVA iş birliğinde yürütülen İkiz Dönüşümde Yeni Ufuklar Projesi’nin Adana etkinliği, 5 Şubat 2026 Perşembe günü ÇUKUROVA SİFED ev sahipliğinde Sheraton Grand Adana’da yapıldı. Denizli ve İzmir’in ardından projenin üçüncü durağı olan Adana buluşması, KOBİ’lerin dijitalleşme ve yeşil dönüşümden oluşan “ikiz dönüşüm” süreçlerine uyumunu desteklemeyi amaçlıyor.\n\nAçılış konuşmalarını TÜRKONFED Yönetim Kurulu Başkan Yardımcısı ve ÇUKUROVA SİFED Yönetim Kurulu Başkanı Vedat Gizer ile Garanti BBVA KOBİ Bankacılığı İstanbul Pazarlama Müdürlüğü Direktörü Haluk Bekmez yaptı. Gizer, ihracatın %35’lik kısmını üstlenen KOBİ’lerin büyük kısmının Avrupa Yeşil Mutabakatı ve onu bütünleyen mevzuata nasıl hazırlanmaları gerektiğini bilmediğini belirterek “Türkiye’de yüksek teknoloji kullanarak imalat yapabilen KOBİ’lerimizin oranı %1 seviyesinde kalıyor” dedi. Adana’nın Marmara’dan sonra ülkenin üretim merkezini Adana–Çukurova eksenine taşıyabilecek durumda olduğunu vurgulayan Gizer, “İkiz dönüşüm bu rolü gerçek kılmamızın anahtarı olabilir” diye konuştu.\n\nProgramda EY Türkiye’den Ece Sevin’in sunumuyla İkiz Dönüşüm Vizyon Oturumu, Onur Ünlü’nün moderatörlüğünde Üretimden Finansmana Yeşil Dönem Paneli, Ivy Decarb Marketplace’in Türk tekstil sektöründe sürdürülebilir dönüşüm oturumu ve Dijital Bankacılık Çözümleriyle Dönüşen İş Dünyası Paneli yer aldı. Etkinlik Sürdürülebilirlik Atölye Çalışması ile sona erdi.\n\nKaynak: [ADSİAD Instagram, davet ve program (2 Şubat 2026)](https://www.instagram.com/p/DUP0G3yAqw1/) · [TÜRKONFED haberi (5 Şubat 2026)](https://turkonfed.org/haberler/turkonfed-ve-garanti-bbva-adanadaki-kobilere-ikiz-donusumu-anlatti) · [Vedat Gizer’in konuşma metni (TÜRKONFED)](https://www.turkonfed.org/medya/konusmalar/turkonfed-yonetim-kurulu-baskan-yardimcisi-vedat-gizer-ikiz-donusumde-yeni-ufuklar-projesi-adana-etkinligi-acilis-konusma-metni)",
      en: "The Adana event of the New Horizons in the Twin Transition project, run by TÜRKONFED in cooperation with Garanti BBVA, was held on Thursday 5 February 2026 at the Sheraton Grand Adana, hosted by ÇUKUROVA SİFED. The Adana meeting, the project’s third stop after Denizli and İzmir, aims to help SMEs adapt to the “twin transition” of digitalisation and green transformation.\n\nThe opening speeches were given by Vedat Gizer, TÜRKONFED Board Vice-Chair and ÇUKUROVA SİFED Board Chair, and Haluk Bekmez, Director of SME Banking Istanbul Marketing at Garanti BBVA. Gizer noted that most SMEs, which account for 35% of exports, do not know how to prepare for the European Green Deal and its complementary legislation, and said: “The share of our SMEs in Türkiye that can manufacture using high technology remains at around 1%.” Stressing that Adana is in a position to carry the country’s production centre to the Adana–Çukurova axis after Marmara, Gizer said: “The twin transition may be the key to making this role real.”\n\nThe programme included a Twin Transition Vision Session presented by Ece Sevin of EY Türkiye, a From Production to Finance: the Green Era panel moderated by Onur Ünlü, an Ivy Decarb Marketplace session on sustainable transformation in the Turkish textile sector, and a panel on Business Transformed by Digital Banking Solutions. The event closed with a Sustainability Workshop.\n\nSources (in Turkish): [ADSİAD Instagram, invitation and programme (2 February 2026)](https://www.instagram.com/p/DUP0G3yAqw1/) · [TÜRKONFED news (5 February 2026)](https://turkonfed.org/haberler/turkonfed-ve-garanti-bbva-adanadaki-kobilere-ikiz-donusumu-anlatti) · [Vedat Gizer’s speech text (TÜRKONFED)](https://www.turkonfed.org/medya/konusmalar/turkonfed-yonetim-kurulu-baskan-yardimcisi-vedat-gizer-ikiz-donusumde-yeni-ufuklar-projesi-adana-etkinligi-acilis-konusma-metni)",
    },
  },
  {
    id: "n25",
    slug: "yeni-uyemiz-ayca-celik",
    date: "2026-04-09",
    kind: "uye",
    title: {
      tr: "Yeni üyemiz: Kimtex Tekstil Yönetim Kurulu Üyesi Ayça Çelik",
      en: "New member: Ayça Çelik, Board Member of Kimtex Tekstil",
    },
    excerpt: {
      tr: "Kimtex Tekstil Yönetim Kurulu Üyesi Ayça Çelik ADSİAD ailesine katıldı.",
      en: "Ayça Çelik, Board Member of Kimtex Tekstil, has joined the ADSİAD family.",
    },
    body: {
      tr: "Kimtex Tekstil Yönetim Kurulu Üyesi Sayın Ayça Çelik’i ADSİAD çatısı altında görmekten memnuniyet duyuyoruz.\n\n1982 yılında kurulan ve bugün üretiminin büyük bölümünü ABD ve Avrupa’ya ihraç eden Kimtex Tekstil, güçlü üretim altyapısı, yenilikçi yaklaşımı ve sektöre kattığı değerle sanayimizin önemli kuruluşlarından biridir.\n\nSürdürülebilirlik, üretim gücü ve liderlik vizyonuyla iş dünyasında fark yaratan Sayın Ayça Çelik’in, ADSİAD’ın değerli yapısına önemli katkılar sunacağına inanıyoruz.\n\nÜyelerimizi [üye rehberinde](/uyeler) bulabilirsiniz.\n\nKaynak: [ADSİAD Instagram (9 Nisan 2026)](https://www.instagram.com/p/DW5x9nhgiHC/) · [ADSİAD LinkedIn (9 Nisan 2026)](https://tr.linkedin.com/posts/adsi%CC%87ad_kimtex-tekstil-y%C3%B6netim-kurulu-%C3%BCyesi-say%C4%B1n-activity-7447912662958755840-vnrI)",
      en: "We are pleased to welcome Ms Ayça Çelik, Board Member of Kimtex Tekstil, under the ADSİAD roof.\n\nFounded in 1982 and today exporting most of its production to the USA and Europe, Kimtex Tekstil is one of the important companies of our industry thanks to its strong production infrastructure, innovative approach and the value it adds to the sector.\n\nWe believe that Ms Ayça Çelik, who makes a difference in the business world with her vision of sustainability, production strength and leadership, will make important contributions to ADSİAD.\n\nYou can find our members in the [member directory](/uyeler).\n\nSources (in Turkish): [ADSİAD Instagram (9 April 2026)](https://www.instagram.com/p/DW5x9nhgiHC/) · [ADSİAD LinkedIn (9 April 2026)](https://tr.linkedin.com/posts/adsi%CC%87ad_kimtex-tekstil-y%C3%B6netim-kurulu-%C3%BCyesi-say%C4%B1n-activity-7447912662958755840-vnrI)",
    },
  },
  {
    id: "n26",
    slug: "tusiad-baskani-ozan-diren-tebrik-ziyareti",
    date: "2026-05-13",
    kind: "haber",
    title: {
      tr: "TÜSİAD Başkanı Ozan Diren’e tebrik ziyareti",
      en: "Congratulatory visit to TÜSİAD Chair Ozan Diren",
    },
    excerpt: {
      tr: "Başkan Vedat Gizer ve yönetim kurulu, TÜSİAD Başkanı seçilen Ozan Diren’i ziyaret etti; bölge ekonomisi değerlendirildi.",
      en: "Chair Vedat Gizer and the board visited Ozan Diren, newly elected Chair of TÜSİAD; the regional economy was discussed.",
    },
    body: {
      tr: "ADSİAD ve ÇUKUROVA SİFED Başkanı Vedat Gizer ve yönetim kurulu, TÜSİAD Başkanı seçilen Ozan Diren’e yeni görevinde tebrik ziyaretinde bulundu. Toplantıda bölge ekonomisi ve genel ekonomik konular değerlendirildi.\n\nKaynak: [ADSİAD Instagram (13 Mayıs 2026)](https://www.instagram.com/p/DYSqdryERsT/)",
      en: "Vedat Gizer, Chair of ADSİAD and ÇUKUROVA SİFED, and the board paid a congratulatory visit to Ozan Diren on his election as Chair of TÜSİAD. The regional economy and general economic issues were discussed at the meeting.\n\nSource (in Turkish): [ADSİAD Instagram (13 May 2026)](https://www.instagram.com/p/DYSqdryERsT/)",
    },
  },
  {
    id: "n27",
    slug: "turkonfed-baskani-suleyman-sonmez-nezaket-ziyareti",
    date: "2026-05-19",
    kind: "haber",
    title: {
      tr: "TÜRKONFED Başkanı Süleyman Sönmez’e nezaket ziyareti",
      en: "Courtesy visit to TÜRKONFED Chair Süleyman Sönmez",
    },
    excerpt: {
      tr: "Vedat Gizer ve yönetim kurulu üyeleri, TÜRKONFED Başkanı Süleyman Sönmez ve yönetim kurulu üyelerini ziyaret etti.",
      en: "Vedat Gizer and board members visited TÜRKONFED Chair Süleyman Sönmez and members of the TÜRKONFED board.",
    },
    body: {
      tr: "ADSİAD ve ÇUKUROVA SİFED Başkanı Vedat Gizer ile Yönetim Kurulu Üyeleri, TÜRKONFED Başkanı Süleyman Sönmez ve Yönetim Kurulu üyelerine nezaket ziyaretinde bulundu.\n\nTÜRKONFED’in 13 Mayıs 2026 tarihli paylaşımına göre, Süleyman Sönmez’in ev sahipliğinde gerçekleşen görüşmede federasyonun ve derneklerinin devam eden çalışmaları hakkında bilgi verildi; gelecek projelere dair TÜRKONFED ile yapılacak iş birlikleri değerlendirildi.\n\nKaynak: [ADSİAD Instagram (19 Mayıs 2026)](https://www.instagram.com/p/DYg-Rtkguae/) · [TÜRKONFED LinkedIn (13 Mayıs 2026)](https://tr.linkedin.com/posts/turkonfed_t%C3%BCrkonfed-activity-7460384934952595456-c8sV)",
      en: "Vedat Gizer, Chair of ADSİAD and ÇUKUROVA SİFED, and board members paid a courtesy visit to TÜRKONFED Chair Süleyman Sönmez and members of the TÜRKONFED board.\n\nAccording to TÜRKONFED’s post of 13 May 2026, the meeting hosted by Süleyman Sönmez covered the ongoing work of the federation and its associations, and future cooperation with TÜRKONFED on upcoming projects was discussed.\n\nSources (in Turkish): [ADSİAD Instagram (19 May 2026)](https://www.instagram.com/p/DYg-Rtkguae/) · [TÜRKONFED LinkedIn (13 May 2026)](https://tr.linkedin.com/posts/turkonfed_t%C3%BCrkonfed-activity-7460384934952595456-c8sV)",
    },
  },
];

export const news: NewsItem[] = newsSeed.map((item) => ({
  ...item,
  image: covers[item.id],
}));
