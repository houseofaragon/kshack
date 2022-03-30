import { isSafari } from "@/helpers/browserDetection";

const defaultAudioStreamerProps = {
  filterType: "lowpass",
  filterFreqVal: "22000"
}

class AudioStreamer {
  constructor(audioElement, props) {
    this.element = audioElement;
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.source = undefined;
    this.streamerProps = props ? props : defaultAudioStreamerProps;
    this.analyser = this.context.createAnalyser();
    this.filter = this.initFilter();
    this.connected = false;
    this.deactivated = isSafari;
    this.element.addEventListener("play", this.onPlay, false);
  }

  onPlay = () => {
    if (!this.connected) {
      this.connect();
    }
    if (this.context.state !== "running") {
      this.context.resume();
    }
  }

  initFilter() {
    let filter = this.context.createBiquadFilter();
    filter.frequency.value = this.streamerProps.filterFreqVal;
    filter.type = this.streamerProps.filterType;
    return filter;
  }

  connect() {
    if (!this.deactivated) {
      this.source = this.context.createMediaElementSource(this.element);
      this.source.connect(this.analyser);
      this.analyser.connect(this.filter);
      this.filter.connect(this.context.destination);
      this.connected = true;
    }
  }
}

export default AudioStreamer;