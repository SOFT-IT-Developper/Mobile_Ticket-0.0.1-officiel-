import { Restservice } from './../../providers/restservice';
import { GlobalVars } from './../../providers/global';
import { Common } from './../../providers/common';
import { HomePage } from './../home/home';
import { VisitStatusEntity } from './../../app/entitie/visit-status.entity';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import {TextToSpeech} from '@ionic-native/text-to-speech';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Platform } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
import { GlobalConstant } from './../../providers/constants';
// import {sprintf} from "sprintf-js";
@Component({
  selector: 'page-showticket',
  templateUrl: 'showticket.html',
  providers: [ LocalNotifications]



})
export class Showticket {
  ticketinfo: {};
  ticketNumber: number;
  idser: number;
  idbr: number;
  clientId: string;
  checksum: number;
  visitId: number;
  sernam: string;
  queueId: number;
  branchId: number;
  serviceId: number;
  branchename?: string;
  ticketencour: boolean;
  iscalled: boolean = false;
  isticketfinish: boolean = false;
  hilightSelcted: boolean = false;
  iserror: boolean = false;
  guichet: string;
  maxNumber:number=999;

  /**Queut info  */

  public servicePointName: string = "";
  public visitPosition: number;
  public waitingVisits: number;
  public index1: number;
  public upper: number;
  public lower: number;
  public prevWaitingVisits: number;
  public prevVisitPosition: number;
  public prevUpperBound: number;
  public prevLowerBound: number;

  public timer;
  loading: any;
  visitinfo: VisitStatusEntity = new VisitStatusEntity()
  /**Time manupule  */

  // private timerStart = 10 * 60 * 1000; //minutes
  //private timerGap = 1000;
  //private countDownreTimersource;
  //private serviceFecthTimerResource
  tab: Array<any> = []
  items: number[] = [];
  fakeArray = new Array(1);
  istiketpresente: boolean = true;
  /**Translate service  */
  titlenotif: string = "Notification";
  titlecancel: string = "Annuler Visite";
  messagenotif: string = "C'est votre tour";
  okbuttonenotif: string = "ok";
  okbuttonecancel: string = "Oui";
  cancelbuttonnotif: string = "non";
  cancelbuttoncancel: string = "Non";
  messagecancel: string = "Voulez vous  annuler la visite";
  text: string = "cool";
  notificationpush:string="Votre ticket N°";
  notificationpush2:string="est appelé au";
  client?:string;
  param = {guichet:" guichet"};
  message : any;


  constructor(private common:Common,
    private appMinimize: AppMinimize,
    public translate: TranslateService,
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
    public navCtrl: NavController,
    private restservice: Restservice,
    private navParams: NavParams,
    private alertCtrl: AlertController) {
      this.client=GlobalVars.getClient()
      //  this.common.presentLoadingDefault();
      this.idser = navParams.get('id');
      this.idbr = navParams.get('idbr');
      this.branchename = navParams.get('branchename');
      this.sernam = navParams.get('sernam');
      this.getvisit(this.idser, this.idbr);
      this.backgroundMode.enable();
      this.backgroundMode.configure({title:"Mobile Ticket",text:"Ticket en cours ..."})
      /*if (this.visitId != null) {
        while (true) {
          console.log("check");
          this.gevisitstatus(this.branchId, this.visitId, this.checksum);
        }
        //
      }*/
      this.platform.registerBackButtonAction(() => {
        console.log('go back')
        this.appMinimize.minimize().then(
          success => console.log('Closed'),
          err => console.log('Something went wrong')
        );

      /* if (this.istiketpresente === true) {
          this.backgroundMode.enable();
          this.presentToast();
          console.log("ticketinfo")
        } else {
          console.log("exte")
          this.platform.exitApp();
        }*/

        //

      }, 200);
      this.chargeTranslate();

  }

  /*async sayText():Promise<any>{
    try{
      await this.tts.speak({text:this.text,locale:"fr-FR",rate:0.5}).then(res=>{
        console.log(res)
      }).catch(erro=>{
        console.log(erro)
      });
    }
    catch(e){
      console.log(e);
    }
  }*/
  getvisit(idser, idbr) {

      console.log("Showticket.getvisit :");
      this.restservice.creatvisit(idser, idbr).subscribe(ticketinfo => {
      console.log('data showticket ' + ticketinfo)
      ticketinfo = this.ticketinfo = ticketinfo;
      // var a=data.results
      this.ticketNumber = ticketinfo.ticketNumber;
      this.branchId = ticketinfo.branchId;
      this.queueId = ticketinfo.queueId;
      this.checksum = ticketinfo.checksum;
      this.serviceId = ticketinfo.serviceId;
      this.visitId = ticketinfo.visitId;
      this.queueId = ticketinfo.queueId;
      // setInterval(console.log(this.loading), 5000);
      console.log(ticketinfo)

      if (this.visitId != null) {
        setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL);
      }
      this.iserror=false;
      this.common.loadingfinish();
      this.common.toastInfo(this.common.getTranslate("Showticketpage.note"));
      console.log(ticketinfo)
    },
    error => {
      this.common.loadingfinish();
      this.iserror=true;
      this.common.toastErrorRetry(()=>{this.getvisit(this.idser,this.idbr)})
      // alert(error + 'erreur')
    }
    )
  }

  /**pop retour */
  Cancelvisite() {
    this.istiketpresente = false;
    let alert = this.alertCtrl.create({
      title: this.titlecancel,
      message: this.messagecancel,
      buttons: [
        {
          text: this.cancelbuttoncancel,
          role: 'cancel',
          handler: () => {
            this.istiketpresente = true;
            setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL);
            console.log('Cancel clicked');
          }
        },
        {
          text: this.okbuttonecancel,
          handler: () => {

            this.SuprimerTicket();
            // this.navCtrl.setRoot(ServicePage,{ id: this.branchId,name:this.branchename})

            console.log('SuprimerTicket ok ');
          }
        }
      ]
    });
    alert.present();
    //this.navCtrl.pop();
  }
  /**Queut fonction
  public hilightSelctedPosition(): boolean {
    if (this.index1 === this.visitPosition) {
      return true;
    }
    return false;
  }
  public isEmptyQueueItem(): boolean {
    return !(this.index1 > 0);
  }


  public getQueueindex1(): any {
    if (this.hilightSelctedPosition()) {
      return this.index1;
    }
    return this.trimindex1(this.index1);
  }

  public trimindex1(index1: number): any {
    if (index1 && index1.toString().length > 3) {
      let a = index1.toString().substr((index1.toString().length - 2), (index1.toString().length));
      return '.' + a;
    }
    return index1;
  }
  */
  public animatePosition(index): boolean {
    if (this.hilightSelcted && index !== this.visitPosition) {
      return false;
    }
    /*/ else if (this.index === this.upper && this.upper > this.prevUpperBound) {
         return true;
    }*/
    return true;
  }


  /** fonction etat visite */
  gevisitstatus(idbr, idse, cheksum) {
    console.log("get visite state");
    this.restservice.getcurentvisitstat(idbr, idse, cheksum).then(ticketviststatus => {
      this.visitinfo = ticketviststatus;
      //verifier la connexion
      /*  if (typeof  this.visitinfo == 'undefined' ) {
        console.log('connection perdu')
        this.toastError();
        setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 10000);
        return;
      }*/
      if (this.iscalled) {
        // Verifier le statut pour savoir lorsque le ticket passe au status END
        setTimeout(() => { this.teststatut(ticketviststatus) }, GlobalConstant.VISIT_STATE_GET_INTERVAL);
      }
      else {
        //
        this.visitPosition = this.visitinfo.position;
        this.servicePointName = this.visitinfo.servicePointName;
        // Trier  de rang
        this.fakeArray = (() => {
          // let startFromZero = false;
          let visibleLineSize = 10;
          this.maxNumber = Number.MAX_VALUE;
          // console.log('max value :' + maxNumber);
          let array = Array(visibleLineSize);
          // let array = Array(this.visitinfo.queueSize);

          for (let i = 0; i < array.length; i++) {
            if(this.visitPosition < visibleLineSize) {
              if(this.visitinfo.queueSize > visibleLineSize ){
                array[i] = visibleLineSize - i;
              }else{
                array[i] = i < this.visitinfo.queueSize ? ( this.visitinfo.queueSize - i ) : this.maxNumber;
              }
            } else {
              array[i] = this.visitPosition < this.visitinfo.queueSize ? ( this.visitPosition + 1 - i ) : ( this.visitPosition - i );
            }
            // array[i] = i + (startFromZero ? 0 : 1);
          }

          return array.sort(function (a, b) {
            return b - a;
          });
        })();
        // console.log(this.fakeArray);
        /* Appel de test status */
        setTimeout(() => { this.teststatut(ticketviststatus) }, GlobalConstant.VISIT_STATE_GET_INTERVAL);
      }
      console.log(ticketviststatus)
      this.iserror = false;
    }, error => {

      console.log(error)
      console.log(' error ===> debug:')
      console.debug(error)

      // if(error.status==404 && error._body.message==="New visits are not available until visitsOnBranchCache is refreshed"){
      // if(error.status==404 && this.iscalled){
      if(error.status==404) { // On considère qu'il y a l'erreur 404 uniquement quand le ticket est introuvable, et non plus lors d'un problème de connexion qu'on a géré avec un timeout sur les http.get() et http.post() - Jacques & Abdou
        this.message = this.common.getTranslate("Showticketpage.ticketEndMessage");
        if(!this.iscalled) {
          this.message = this.common.getTranslate("Showticketpage.ticketNoShowMessage");
          this.iscalled = true;
        }
        this.isticketfinish = true
      }else{
          /*this.iserror = true;
          this.common.toastErrorRetry(()=>{this.gevisitstatus(this.idbr,this.idser,this.checksum)})
*/
          // Afiiche le message d'erreur de connexion lorsque le ticket est créé ou appélé sans fermer la page de ticket
          this.common.toastError();
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL)
      }
    })
  /*    .catch(error => {
      console.log('Une erreur est survenue ' + error)
      console.log(error)
  })*/
  }

  /**voir si la position est superieur 10 */
  showrang(): any {
    if (this.visitPosition > 10) {
      return false;
    }
    else {
      return true;
    }
  }

  /**visite position index du client  */
  public SelctedPosition(index): boolean {
    // console.log("inexdex")
    // console.log(index)
    if (index === this.visitPosition) {
      this.hilightSelcted = true;
      return true;
    }
    return false;
  }

  /** Voir la status du client  */
  private teststatut(Viststate: VisitStatusEntity) {
    console.log('test status')
    if (typeof Viststate == 'undefined' && this.iscalled) {
      console.log('ticket fini' + Viststate)
      this.isticketfinish = true
    } else {

      if (Viststate.currentStatus === 'IN_QUEUE' && this.istiketpresente) {
        if (this.queueId != Viststate.queueId) {
          this.sernam = Viststate.queueName;
        }
      //  this.timer = TimerObservable.create(5000, 5000);
        if (!this.showrang()) {
          setTimeout(() => { console.log('10'); this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL)
        } else {
          console.log('verifie')
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL)
        }

      } else if (Viststate.currentStatus === 'CALLED') {
        // this.istiketpresente = false;
        if (this.iscalled) {
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL)
        } else {
          this.guichet = Viststate.servicePointName;
          this.param={guichet:this.guichet};
         // this.common.toastInfo(this.common.getTranslate("Showticketpage.yourturn")+this.guichet);
          this.notification();
          this.presentAlert()
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, GlobalConstant.VISIT_STATE_GET_INTERVAL)
        }
        //this.text="Vous ete attendu";
        // this.sayText();
        console.log('called')
      }
    }
  }
  /**Alert de ticket  */
  presentAlert() {
    this.translate.get('Dialogue.massagenofif',{guichet:this.guichet}).subscribe((res: string) => {
      this.messagenotif = res;
    });
    let alert = this.alertCtrl.create({
      title: this.titlenotif,
      subTitle: this.messagenotif,
      buttons: [{
        text: this.okbuttonenotif,
        handler: () => {
          // this.navCtrl.setRoot(HomePage)
          console.log('Buy clicked');
        }
      }]
    });
    alert.present();
  }
  /**Confimation annuler ticket */
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: this.titlenotif,
      message: this.messagenotif + this.servicePointName,
      buttons: [
        {
          text: this.cancelbuttonnotif,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.okbuttonenotif,
          handler: () => {
            this.navCtrl.setRoot(HomePage)
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  /**Notification  */
  notification() {
    this.translate.get('Showticketpage.notificationpush',{ ticket: this.ticketNumber,guichet:this.guichet}).subscribe((res: string) => {
      this.notificationpush = res;
    });
    this.iscalled = true;
    this.localNotifications.schedule({
      id: 1,
      text: this.notificationpush,
      // sound: '../../assets/YourTurn.wav',
      data: { secret: "nonif" }
    });

  }
  /**Annuler Ticket */
  SuprimerTicket() {
    this.common.presentLoadingDefault()
    this.restservice.cancelvisit(this.branchId, this.visitId, this.checksum).then(ticketsuprime => {
      this.common.loadingfinish();
      this.navCtrl.setRoot(HomePage);
      console.log(ticketsuprime)

    }, error => {
      console.log('erreur ' + error);
      this.common.loadingfinish();
      this.common.toastErrorRetry(()=>{this.SuprimerTicket()})
    }
    )
  }
  /**charger les translation  */
  chargeTranslate() {
    // this.titlenotif = this.getTranslante('Showticketpage.dialog.titleTicketCall');
    // this.titlecancel =  this.getTranslante('Dialogue.titlecancel');
    // this.notificationpush2=this.common.getTranslate("Showticketpage.notificationpush2");
    //this.messagenotif=this.common.getTranslate("Dialogue.massagenofif");
    this.translate.get('Showticketpage.dialog.titleTicketCall').subscribe((res: string) => {
      this.titlenotif = res;
    });

    this.translate.get('Showticketpage.notificationpush',{ ticket: this.ticketNumber,guichet:this.guichet}).subscribe((res: string) => {
      this.notificationpush = res;
    });

    /*this.translate.get('Showticketpage.notificationpush1').subscribe((res: string) => {
      this.notificationpush1 = res;
    });*/
    this.translate.get('Dialogue.titlecancel').subscribe((res: string) => {
      this.titlecancel = res;
    });
    // this.translate.get('Dialogue.massagenofif').subscribe((res: string) => {
    //   this.messagenotif = res;
    // });
    this.translate.get('Dialogue.massagecancel').subscribe((res: string) => {
      this.messagecancel = res;
    });
    this.translate.get('Dialogue.oknotif').subscribe((res: string) => {
      this.okbuttonenotif = res;
    });
    this.translate.get('Dialogue.okcancel').subscribe((res: string) => {
      this.okbuttonecancel = res;
    });
    this.translate.get('Dialogue.cancelbuttonnotif').subscribe((res: string) => {
      this.cancelbuttonnotif = res;
    });

  }
  /***retour home */
  home() {
    this.istiketpresente=false;
    this.navCtrl.setRoot(HomePage)
  }
}
