import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ModalController,ActionSheetController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommentPage } from "../comment/comment"
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMess:string;
  avgstars:string;
  numcomments:number;
  favorite: boolean;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  @Inject('BaseURL') private BaseURL,
  private favoriteservice: FavoriteProvider,
  private toastCtrl: ToastController,
  private modalCtrl: ModalController,
  private actionCtrl: ActionSheetController,
  private socialSharing: SocialSharing) 
  {
    this.dish=navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments=this.dish.comments.length;

    let total=0;
    this.dish.comments.forEach(Comment=>total+= Comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.name + ' added as favorite successfully',
      position: 'middle',
      duration: 2000}).present();
  }
  
  presentActionSheet() {
    let actionSheet = this.actionCtrl.create({
      buttons: [
        {
          text: 'Add to Favourites',
          handler: () => {
            this.addToFavorites();
          }
        }, {
          text: 'Add a Comment',
          handler: () => {
            console.log('Archive clicked');
            let modal = this.modalCtrl.create(CommentPage);
            modal.onDidDismiss(data => {
              if (data == null) {
                console.log("data is null");
              } else {
                console.log("New comment", data);
                this.dish.comments.push(data);
              }
            });
            modal.present();
          }
        }, 
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
