import * as THREE from "three";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Door {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.group = new THREE.Group();

    this.setLight();

    this.group.rotation.y = Math.PI
    this.group.position.y = 1;
    this.scene.add(this.group);
  }

  setLight() {
    let num = 3;
    let radius = 1.5

    for (let i = 0; i < num; i++) {
      var rectAreaLight = new THREE.RectAreaLight(0xffffff, 10, 1, 2);
      // this.rectAreaLight.lookAt(new this)
    //   rectAreaLight.position.set(0.75, 1, -1.5);
    //   rectAreaLight.rotation.y = -Math.PI * 0.75;
      rectAreaLight.position.x = Math.sin(((Math.PI) / num) * i-1) * radius;
      rectAreaLight.position.z = Math.cos(((Math.PI) / num) * i-1) * radius;
      rectAreaLight.lookAt(new THREE.Vector3)
      
      this.group.add(rectAreaLight);

      var rectLightHelper = new RectAreaLightHelper(rectAreaLight);
      rectAreaLight.add(rectLightHelper);

      //   child.position.x = Math.sin(((Math.PI * 2) / num) * i) * radius;
      //   child.position.z = Math.cos(((Math.PI * 2) / num) * i) * radius;
    }
  }
}
