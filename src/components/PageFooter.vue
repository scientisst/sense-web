<template>
  <div id="footer">
    <div id="content" class="column">
      <div class="row space-between">
        <div class="column">
          <div class="row gap" id="social-icons">
            <a href="https://github.com/scientisst"
              ><font-awesome-icon :icon="['fab', 'github']" size="lg"
            /></a>
            <a href="https://www.instagram.com/scientissthub/">
              <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
            </a>
            <a href="https://www.facebook.com/ScientISST">
              <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
            </a>
            <a href="https://www.linkedin.com/company/scientisst/">
              <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
            </a>
          </div>
          <p>
            ScientISST is hosted at Instituto de Telecomunicações (IT), Lisboa,
            Portugal.
            <br />
            (C) 2022 ScientISST. All rights reserved.
          </p>
        </div>
        <div class="column gap">
          <a href="https://scientisst.com/">
            <img src="@/assets/img/logos/ScientISST-Hor-Wht.svg" />
          </a>
          <div class="row gap">
            <a href="https://it.pt/">
              <img src="@/assets/img/logos/it.svg" />
            </a>
            <a href="https://tecnico.ulisboa.pt/">
              <img src="@/assets/img/logos/tecnico.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
library.add(faFacebook, faInstagram, faLinkedin, faGithub);

export default {
  name: "PageFooter",
};
</script>

<style scoped>
#footer {
  width: 100%;
  background: #ef4b59;
  color: white;
}

#content {
  padding: 16px;
  max-width: 1000px;
  margin: auto;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
}

.gap {
  gap: 1em;
}

.space-between {
  justify-content: space-between;
}

p {
  text-align: left;
  font-size: 14px;
}

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}

img {
  height: 30px;
}
</style>