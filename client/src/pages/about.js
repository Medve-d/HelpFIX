const Blog = () => {
  return (
    <>
      <head>
        <title>Blog</title>
      </head>
      <main>
        <h1 className="h1 about">Nouveautés chez HelpFIX</h1>
        
        <section className="texteBlog">
          <p>
            Bienvenue sur HelpFIX, votre destination en ligne pour trouver des prestataires de services qualifiés et fiables. Avec notre plateforme conviviale, vous pouvez découvrir une multitude de fonctionnalités conçues pour simplifier votre recherche. Que vous ayez besoin d'aide pour trouver un prestataire de services manuellement ou automatiquement grâce à ANIR, notre chatbot intelligent, HelpFIX est là pour vous aider...
          </p>
        </section>

        <section className="creditBlog">
          <h2>Notre Équipe</h2>
          <p>
            HelpFIX est une plateforme web créée par Nikolai ZLODEYEV, et Maxime STAJSZCZYK. Nous avons conçu cette solution pour mettre en relation les utilisateurs avec des prestataires de services pour divers besoins. Notre mission est de rendre la recherche de services plus rapide, plus simple et plus fiable.
          </p>
        </section>

        <section className="prestatireBlog">
          <h2>Nos Prestataires</h2>
          <p>
            Nos prestataires sont soigneusement sélectionnés pour garantir un service de qualité. Que vous recherchiez un plombier, un électricien, un développeur ou tout autre professionnel, HelpFIX vous connecte avec des experts qualifiés et vérifiés.
          </p>
        </section>

        <section className="fonctionnalitesBlog">
          <h2>Fonctionnalités Clés</h2>
          <ul>
            <li>Recherche manuelle ou automatique de prestataires.</li>
            <li>Évaluations pour chaques utilisateurs.</li>
            <li>Interface utilisateur sobre et simple.</li>
          </ul>
        </section>

        <section className="temoignagesBlog">
          <h2>Témoignages</h2>
          <p>
            "HelpFIX m'a permis de trouver un excellent électricien en quelques minutes. Je recommande vivement cette plateforme !" - Client satisfait
          </p>
          <p>
            "Grâce à HelpFIX, j'ai pu développer mon activité en tant que prestataire. Une plateforme vraiment utile !" - Prestataire partenaire
          </p>
        </section>

        <section className="contactBlog">
          <h2>Contactez-nous</h2>
          <p>
            Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter via notre formulaire en ligne ou par email à <a href="mailto:support@helpfix.com">support@helpfix.com</a>.
          </p>
        </section>
      </main>
    </>
  );
};

export default Blog;
