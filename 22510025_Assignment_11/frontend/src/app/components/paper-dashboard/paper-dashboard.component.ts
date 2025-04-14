import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { PaperInfoService } from '../../services/paper-info.service';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  FileText,
  FileStack,
  Quote,
  Hash,
  Tag,
  ArrowDown,
} from 'lucide-angular';

export interface ParsedCitation {
  authors: string;
  title: string;
  booktitle: string;
  pages: string;
  month: string;
  year: string;
  raw: string;
}

@Component({
  selector: 'app-paper-dashboard',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './paper-dashboard.component.html',
  styleUrls: ['./paper-dashboard.component.css'],
})
export class PaperDashboardComponent {
  readonly FileText = FileText;
  readonly FileStack = FileStack;
  readonly Quote = Quote;
  readonly Hash = Hash;
  readonly Tag = Tag;
  readonly ArrowDown = ArrowDown;

  paperIdA = '';
  paperIdB = '';
  paperIdSingle = '';

  citationPathResult: any = null;
  paperDetails: any = null;
  paperClassification: any = null;
  parsedCitation: ParsedCitation | null = null;

  parsedCitationPath: {
    paper: any;
    parsed: ParsedCitation;
  }[] = [];

  constructor(private paperService: PaperInfoService) {}

  onCheckCitationPath() {
    if (this.paperIdA && this.paperIdB) {
      this.paperService
        .getCitationPath(this.paperIdA, this.paperIdB)
        .subscribe({
          next: (res) => {
            this.citationPathResult = res;

            // Convert to structured path array
            const pathArray = [];

            // Add first paper (startPaper)
            if (res.startPaper) {
              pathArray.push({
                paper: res.startPaper,
                parsed: this.parseCitation(res.startPaper.citation_string),
              });
            }

            // Add intermediate steps from citationPath
            for (const step of res.citationPath) {
              pathArray.push({
                paper: step.end,
                parsed: this.parseCitation(step.end.citation_string),
              });
            }

            this.parsedCitationPath = pathArray;
          },
          error: (err) => {
            console.error(err);
            this.citationPathResult = {
              error: 'Failed to fetch citation path',
            };
          },
        });
    }
  }

  onGetPaperDetails() {
    if (this.paperIdSingle) {
      this.paperService.getPaperInfo(this.paperIdSingle).subscribe({
        next: (res) => {
          this.paperDetails = res;
          // Parse citation string here
          if (res?.citation_string) {
            this.parsedCitation = this.parseCitation(res.citation_string);
          } else {
            this.parsedCitation = null;
          }
        },
        error: (err) => {
          console.error(err);
          this.paperDetails = { error: 'Failed to fetch paper info' };
          this.parsedCitation = null;
        },
      });

      this.paperService.getPaperClassification(this.paperIdSingle).subscribe({
        next: (res) => (this.paperClassification = res),
        error: (err) => {
          console.error(err);
          this.paperClassification = {
            error: 'Failed to fetch classification',
          };
        },
      });
    }
  }

  parseCitation(citation: string): ParsedCitation {
    const extract = (tag: string): string => {
      const match = citation.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's'));
      return match ? match[1].trim() : '';
    };

    return {
      authors: extract('author'),
      title: extract('title'),
      booktitle: extract('booktitle'),
      pages: extract('pages'),
      month: extract('month'),
      year: extract('year'),
      raw: citation,
    };
  }
}
