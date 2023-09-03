import mongoose from 'mongoose';
import IUrl from '../types/url';

const Url = mongoose.model(
  'Urls',
  new mongoose.Schema<IUrl>({
    ogUrl: {
      type: String,
      required: true,
      minlength: 5
    },
    shortId: {
      type: String,
      requied: true,
      index: {
        unique: true
      }
    },
    options: {
      type: Object
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: {
        expires: 10000
      }
    }
  })
);

export default Url;
