import {Component, OnInit, NgZone} from "@angular/core";
import {SpeechRecognition, SpeechRecognitionTranscription} from "nativescript-speech-recognition";
import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';
import * as _ from 'lodash';
import {jokes} from "~/app/helpers/jokes_categories";

@Component({
    selector: "gr-speech",
    moduleId: module.id,
    templateUrl: "./speech.component.html",
    styleUrls: ["./speech.component.css"]
})
export class SpeechComponent implements OnInit {
    // todo: use this for animation
    isSpeaking: boolean;
    jokes: {joke: string, category: string[]}[] = jokes;
    categories: string[];

    currentLanguage: string = 'en-GB';
    languages: {[k: string]: string}[] = [
        {['British']: 'en-GB'},
        {['American']: 'en-US'},
        {['Indian']: 'en-IN'},
        {['Jamaican']: 'en-JM'},
        {['Dutch']: 'nl-NL'},
        {['Italian']: 'it-IT'},
        {['Japanese']: 'ja'}
    ];

    private speakOptions: SpeakOptions = {
        text: '',
        speakRate: 1,
        locale: this.currentLanguage,
        finishedCallback: (() => {
            this.isSpeaking = false;
        })
    };

    private speechRecognition = new SpeechRecognition();
    private userText = 'Show userText';
    private appText = 'Tell me the subject about which you want to hear a joke, or select a subject by tapping it';
    private TTS: TNSTextToSpeech;

    constructor(private zone: NgZone) {
        this.TTS = new TNSTextToSpeech();
    }

    ngOnInit(): void {
        this.checkAvailability();
        const categories = _.flatten(jokes.map((j) => j.category))
        this.categories = categories.filter((c, i) => i === categories.indexOf(c));
    }

    private checkAvailability(): void {
        this.speechRecognition.available().then(
            (available: boolean) => console.log(available? "Available!": "Not available :("),
            (err: string) => console.log(err)
        );
    }

    public startListening(): void {
        this.speechRecognition.startListening({
            locale: "en-US",
            onResult: (transcription: SpeechRecognitionTranscription) => {
                this.zone.run(() => this.userText = transcription.text);
                console.log(transcription.text);

                if (transcription.finished) {
                    console.log(`Finished`);
                    this.stopListening().then(() => this.tellJoke(transcription.text));
                }
            }
        }).then(
            (started: boolean) => console.log('Started listening'),
            (err: string) => console.log(`Error: ${err}`)
        );
    }

    public stopListening(): Promise<void> {
        return this.speechRecognition.stopListening().then(
            () => console.log('Stopped listening'),
            (err: string) => console.log(`Stop error: ${err}`)
        );
    }

    // todo: tinker with options and actually call on button press
    speak(text: string): void {
        this.isSpeaking = true;
        this.TTS.speak({...this.speakOptions, text});
    }

    private tellJoke(subject: string): void {
        const chosenJoke = _.sample(this.jokes.filter((j) => {
            return j.category.some(cat => subject.toLowerCase().split(" ").includes(cat))
        }));

        if (!!chosenJoke) {
            this.speak(`Okay, here goes: ${chosenJoke.joke}. Hahaha!`);
        } else {
            this.speak('C\'Mon, I don\'t know any jokes about that!');
        }
    }
}
