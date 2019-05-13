import { Aquarium } from './Aquarium';

var MockSnapshotImages:string[] =
[
  "data:image/jpeg;base64,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",
  "https://yournews.com/wp-content/uploads/Reuters_Direct_Media/USOnlineReportScienceNews/tagreuters.com2018binary_LYNXNPEE9H1WJ-VIEWIMAGE.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqlNYTKsBdx6iJ_1hoQO2uJi8ngPWx6VjIektDcGxC-oZJ1QTGxQ"
]

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export class AquariumSnapshot
{
  id: number //= Math.floor(Math.random() * 100);
  aquarium: Aquarium
  aquariumId: number
  date: Date
  ammonia: number
  nitrite: number
  nitrate: number
  ph: number
  temperature: number


  getImgSrc() {
    return "/photos/0/" + this.id + ".jpg";
  }
}
