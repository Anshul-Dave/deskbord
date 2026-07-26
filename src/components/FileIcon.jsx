import React from 'react';
import {
  Folder,
  File,
  Image as ImageIcon,
  FileText,
  FileCode,
  FileArchive, 
  Music,
  Video
} from 'lucide-react';
import { cn } from '../utils';

export const FileIcon = ({ name, isDirectory, size }) => {
  if (isDirectory) return <Folder className="w-10 h-10 text-blue-500 fill-blue-500/20" />;

  const ext = name.split('.').pop().toLowerCase();
  const iconClass = "w-10 h-10";

  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext))
    return <ImageIcon className={cn(iconClass, "text-emerald-500")} />;
  if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext))
    return <FileText className={cn(iconClass, "text-blue-600")} />;
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext))
    return <FileArchive className={cn(iconClass, "text-orange-500")} />;
  if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext))
    return <Music className={cn(iconClass, "text-purple-500")} />;
  if (['mp4', 'mkv', 'avi', 'mov'].includes(ext))
    return <Video className={cn(iconClass, "text-rose-500")} />;
  if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'py', 'go', 'cpp'].includes(ext))
    return <FileCode className={cn(iconClass, "text-amber-500")} />;

  return <File className={cn(iconClass, "text-gray-400")} />;
};
