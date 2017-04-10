class MusicPlayer extends Pan.Component {
            beforeMount() {
                this.props = {
                    playing : true,
                    progress: 0
                }
            }

            onClick(instance) {
                // console.log(this._refs.get('playbutton'));
            }

            playButton() {
                this.setProps({
                    playing : !this.props.playing
                });

                if (this.props.playing) {
                    this.aud.play();
                }
                else {
                    this.aud.pause();
                }
            }

            calculateProgress() {
                // console.log(this.aud.currentTime, this.aud.duration)
                var progress = ((this.aud.currentTime / this.aud.duration) * 100) + '%';

                this.setProps({
                    progress : progress
                })

                requestAnimationFrame(this.calculateProgress.bind(this));
            }

            render() {
                return (Pan.createElement('div#app', {cow : 'moo'}, [
                    Pan.createElement('div.player-app', [
                        Pan.createElement('div.player-modal', [
                            Pan.createElement('div.player',[
                                Pan.createElement('div.play-control', {ref: 'playbutton', on : {click : (e) => { this.playButton() }}},[
                                    Pan.createElement('div.control-buttons', [
                                        Pan.createElement('div.pause', {
                                            class : { hide : this.props.playing}
                                        },[
                                            Pan.createElement('svg', {attrs:{width:'26px',height:'26px', viewBox: '0 0 353.562 353.562'} }, [
                                                Pan.createElement('g', [
                                                    Pan.createElement('g', [
                                                        Pan.createElement('path', {attrs:{
                                                            d:'M41.064,353.562h109.014V0H41.064V353.562z'
                                                        }})
                                                    ]),
                                                    Pan.createElement('g', [
                                                        Pan.createElement('path', {attrs:{
                                                            d:'M203.482,0v353.562h109.017V0H203.482z'
                                                        }})
                                                    ])
                                                ])
                                            ])
                                        ]),

                                        Pan.createElement('div.play', {
                                            class: { hide: !this.props.playing}
                                        }, [
                                            Pan.createElement('svg', {attrs:{width:'26px',height:'26px', viewBox: '0 0 41.999 41.999'} }, [
                                                Pan.createElement('path', {attrs: {
                                                    d:'M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z'
                                                }}
                                                )
                                            ])
                                        ])
                                    ])
                                ]),
                                Pan.createElement('div.progress', `${this.props.playing}`,[
                                    Pan.createElement('div.progress-holder', [
                                        Pan.createElement('div.progress-full', [
                                            Pan.createElement('svg', {attrs: {
                                                width: '100%', height: '3px'
                                            }}, [
                                                Pan.createElement('rect', {
                                                    attrs: {
                                                        width:'100%', height:'3px'
                                                    },
                                                    style: {
                                                        fill: 'rgb(222,222,222)'
                                                    }
                                                })
                                            ]),
                                            Pan.createElement('svg', {attrs: {
                                                width: '100%', height: '3px', class:'progress'
                                            }}, [
                                                Pan.createElement('rect', {
                                                    attrs: {
                                                        width:this.props.progress, height:'3px'
                                                    },
                                                    style: {
                                                        fill: 'gold'
                                                    }
                                                })
                                            ]),
                                            
                                        ]),
                                    ])
                                ])
                            ])
                        ])
                    ])
                ]));
            }

            constructor() {
                super();
                this.aud = new Audio('../src/data/yungbratz.wav');

                setTimeout(() => {
                    this.aud.play();
                    console.log(this.aud.currentTime);
                    console.log(this.aud.duration);
                    this.calculateProgress();
                    document.getElementById('loading').style.opacity = 0;
                    document.getElementById('loading').style.zIndex = -10;
                    // document.getElementsByTagName('body')[0].removeChild(document.getElementById('loading'));
                    
                }, 1000)

            }
        }